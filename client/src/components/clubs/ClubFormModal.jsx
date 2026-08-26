import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import { useAlert } from '../../hooks/useAlert';
import { clubService } from '../../services/clubService';
import { CLUB_CATEGORIES } from '../../utils/constants';

const INITIAL_CLUB_FORM = {
  name: '',
  category: 'Technical',
  tagline: '',
  description: '',
  leadCoordinator: '',
  facultyAdvisor: '',
  email: '',
  meetingSchedule: '',
  bannerImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
  logo: '💻',
  tags: 'Innovation, Campus',
};

/**
 * ClubFormModal provides an administrative dialog to register new campus clubs
 * or modify existing club coordinators, descriptions, tags, and meeting schedules.
 */
export default function ClubFormModal({ isOpen, onClose, clubToEdit, onSaved }) {
  const { showToast } = useAlert();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(INITIAL_CLUB_FORM);

  useEffect(() => {
    if (clubToEdit) {
      setFormData({
        ...clubToEdit,
        tags: Array.isArray(clubToEdit.tags) ? clubToEdit.tags.join(', ') : clubToEdit.tags || '',
      });
    } else {
      setFormData(INITIAL_CLUB_FORM);
    }
  }, [clubToEdit, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast('Club name is required', 'error');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        tags: typeof formData.tags === 'string' ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean) : formData.tags,
      };

      if (clubToEdit) {
        await clubService.updateClub(clubToEdit._id, payload);
        showToast('Club updated successfully', 'success');
      } else {
        await clubService.createClub(payload);
        showToast('New club created successfully!', 'success');
      }

      if (onSaved) onSaved();
      onClose();
    } catch (err) {
      showToast(err.message || 'Failed to save club', 'error');
    } finally {
      setLoading(false);
    }
  };

  const categoryOptions = CLUB_CATEGORIES.filter((c) => c !== 'All');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={clubToEdit ? 'Edit Club Portfolio' : 'Register New Campus Club'}
      subtitle="Publish and manage student organization details on the portal."
      maxWidth="max-w-2xl"
      footer={
        <>
          <Button variant="outline" size="sm" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={handleSubmit} isLoading={loading}>
            {clubToEdit ? 'Update Club' : 'Create Club'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <Input
              label="Club Name"
              name="name"
              placeholder="e.g. TeChitkara"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Input
              label="Emoji / Icon Logo"
              name="logo"
              placeholder="💻 / 🎭 / ⚽"
              value={formData.logo}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Category"
            name="category"
            type="select"
            value={formData.category}
            onChange={handleChange}
            options={categoryOptions}
          />
          <Input
            label="Official Contact Email"
            name="email"
            type="email"
            placeholder="club@chitkara.edu.in"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <Input
          label="Short Tagline"
          name="tagline"
          placeholder="Brief 1-sentence value proposition"
          value={formData.tagline}
          onChange={handleChange}
        />

        <Input
          label="Detailed Description & Mission"
          name="description"
          type="textarea"
          rows={3}
          placeholder="Describe the club purpose, target activities, and benefits for students..."
          value={formData.description}
          onChange={handleChange}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Student Lead Coordinator"
            name="leadCoordinator"
            placeholder="e.g. Priya Sharma"
            value={formData.leadCoordinator}
            onChange={handleChange}
          />
          <Input
            label="Faculty Advisor"
            name="facultyAdvisor"
            placeholder="e.g. Dr. Rajesh Verma"
            value={formData.facultyAdvisor}
            onChange={handleChange}
          />
        </div>

        <Input
          label="Regular Meeting Schedule & Venue"
          name="meetingSchedule"
          placeholder="e.g. Wednesdays, 4:30 PM - Tech Lab 3"
          value={formData.meetingSchedule}
          onChange={handleChange}
        />

        <Input
          label="Banner Image URL"
          name="bannerImage"
          placeholder="https://images.unsplash.com/..."
          value={formData.bannerImage}
          onChange={handleChange}
          helperText="Direct image URL for club header cover"
        />

        <Input
          label="Tags (Comma separated)"
          name="tags"
          placeholder="Coding, AI, Hackathons"
          value={formData.tags}
          onChange={handleChange}
        />
      </form>
    </Modal>
  );
}
