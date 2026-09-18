import { useEffect, useState } from 'react';
import { API_URL } from '../../config';
import './ProfileCard.css';

const ProfileCard = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const baseUrl = API_URL || '';

  useEffect(() => {
    const fetchProfile = async () => {
      const email = sessionStorage.getItem('email');

      if (!email) {
        setError('Please log in to view your profile.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${baseUrl}/api/auth/user`,
          {
            method: 'GET',
            headers: {
              email,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || 'Unable to load profile.'
          );
        }

        setProfile({
          name: data.name || '',
          email: data.email || email,
          phone: data.phone || '',
        });

        setFormData({
          name: data.name || '',
          phone: data.phone || '',
        });
      } catch (fetchError) {
        setError(fetchError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [baseUrl]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setMessage('');
    setError('');
  };

  const handleCancel = () => {
    setFormData({
      name: profile.name,
      phone: profile.phone,
    });

    setIsEditing(false);
    setMessage('');
    setError('');
  };

  const handleSave = async (event) => {
    event.preventDefault();

    if (formData.name.trim().length < 4) {
      setError('Name must be at least 4 characters.');
      return;
    }

    if (!/^\d{10}$/.test(formData.phone.trim())) {
      setError('Phone Number must contain exactly 10 digits.');
      return;
    }

    setSaving(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch(
        `${baseUrl}/api/auth/user`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            email: profile.email,
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            phone: formData.phone.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        const apiMessage =
          data.error ||
          data.errors?.[0]?.msg ||
          'Unable to update profile.';

        throw new Error(apiMessage);
      }

      const updatedProfile = {
        ...profile,
        name: formData.name.trim(),
        phone: formData.phone.trim(),
      };

      setProfile(updatedProfile);

      sessionStorage.setItem(
        'name',
        updatedProfile.name
      );

      sessionStorage.setItem(
        'phone',
        updatedProfile.phone
      );

      if (data.authtoken) {
        sessionStorage.setItem(
          'auth-token',
          data.authtoken
        );
      }

      setIsEditing(false);
      setMessage('Profile updated successfully.');
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="profile-page">
        <div className="profile-status">
          Loading profile...
        </div>
      </main>
    );
  }

  if (error && !profile.email) {
    return (
      <main className="profile-page">
        <div className="profile-status profile-error">
          {error}
        </div>
      </main>
    );
  }

  const initials = profile.name
    ? profile.name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'PT';

  return (
    <main className="profile-page">
      <section className="profile-card">
        <div className="profile-card-header">
          <div className="profile-avatar">
            {initials}
          </div>

          <div>
            <span>Patient account</span>
            <h1>Your Profile</h1>
            <p>
              View and manage your personal information.
            </p>
          </div>
        </div>

        {!isEditing ? (
          <div className="profile-details">
            <div className="profile-detail">
              <span>Full Name</span>
              <strong>{profile.name}</strong>
            </div>

            <div className="profile-detail">
              <span>Email Address</span>
              <strong>{profile.email}</strong>
            </div>

            <div className="profile-detail">
              <span>Phone Number</span>
              <strong>{profile.phone}</strong>
            </div>

            {message && (
              <div
                className="profile-success"
                role="status"
              >
                {message}
              </div>
            )}

            <button
              type="button"
              className="profile-edit-button"
              onClick={() => {
                setIsEditing(true);
                setMessage('');
                setError('');
              }}
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <form
            className="profile-edit-form"
            onSubmit={handleSave}
          >
            <div className="profile-field">
              <label htmlFor="profile-name">
                Full Name
              </label>

              <input
                id="profile-name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="profile-field">
              <label htmlFor="profile-email">
                Email Address
              </label>

              <input
                id="profile-email"
                type="email"
                value={profile.email}
                disabled
              />
            </div>

            <div className="profile-field">
              <label htmlFor="profile-phone">
                Phone Number
              </label>

              <input
                id="profile-phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                maxLength="10"
                required
              />
            </div>

            {error && (
              <div
                className="profile-error"
                role="alert"
              >
                {error}
              </div>
            )}

            <div className="profile-actions">
              <button
                type="button"
                className="profile-cancel-button"
                onClick={handleCancel}
                disabled={saving}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="profile-save-button"
                disabled={saving}
              >
                {saving
                  ? 'Saving...'
                  : 'Save Changes'}
              </button>
            </div>
          </form>
        )}
      </section>
    </main>
  );
};

export default ProfileCard;