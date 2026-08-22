import React, { useState } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import { useAlert } from '../../hooks/useAlert';
import { announcementService } from '../../services/announcementService';

export default function AnnouncementFormModal({ isOpen, onClose, onSaved }) {
  const { showToast } = useAlert();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    priority: 'General',
    author: 'Dean of Student Affairs',
    targetAudience: 'All Students',
    isPinned: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      showToast('Title and announcement content are required', 'error');
      return;
    }

    setLoading(true);
    try {
      await announcementService.createAnnouncement(formData);
      showToast('Announcement broadcasted to campus portal!', 'success');
      setFormData({
        title: '',
        content: '',
        priority: 'General',
        author: 'Dean of Student Affairs',
        targetAudience: 'All Students',
        isPinned: false,
      });
      if (onSaved) onSaved();
      onClose();
    } catch (err) {
      showToast(err.message || 'Failed to broadcast announcement', 'error');
    } finally {
      setLoading(false);
    }
  };

  const priorityOptions = ['General', 'Urgent', 'Event Alert', 'Academic'];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Broadcast Campus Notice"
      subtitle="Publish an official announcement to the student feed."
      maxWidth="max-w-xl"
      footer={
        <>
          <Button variant="outline" size="sm" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={handleSubmit} isLoading={loading}>
            Broadcast Notice
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Announcement Title"
          name="title"
          placeholder="e.g. Schedule Update for Annual Sports Trials"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Priority Level"
            name="priority"
            type="select"
            value={formData.priority}
            onChange={handleChange}
            options={priorityOptions}
          />
          <Input
            label="Target Audience"
            name="targetAudience"
            placeholder="e.g. All Students or 1st Year"
            value={formData.targetAudience}
            onChange={handleChange}
          />
        </div>

        <Input
          label="Issuer / Author Name"
          name="author"
          placeholder="e.g. Office of Dean / ByteCraft Core"
          value={formData.author}
          onChange={handleChange}
        />

        <Input
          label="Announcement Body"
          name="content"
          type="textarea"
          rows={4}
          placeholder="Provide clear details and instructions for students..."
          value={formData.content}
          onChange={handleChange}
          required
        />

        <div className="flex items-center gap-2 pt-1">
          <input
            id="isPinned"
            name="isPinned"
            type="checkbox"
            checked={formData.isPinned}
            onChange={handleChange}
            className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor="isPinned" className="text-xs font-semibold text-slate-700 cursor-pointer">
            Pin this announcement to top of feed
          </label>
        </div>
      </form>
    </Modal>
  );
}
