import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import { useAlert } from '../../hooks/useAlert';
import { eventService } from '../../services/eventService';
import { clubService } from '../../services/clubService';
import { CLUB_CATEGORIES } from '../../utils/constants';

export default function EventFormModal({ isOpen, onClose, eventToEdit, onSaved }) {
  const { showToast } = useAlert();
  const [loading, setLoading] = useState(false);
  const [clubs, setClubs] = useState([]);

  const initialForm = {
    title: '',
    clubId: '',
    clubName: '',
    category: 'Technical',
    shortDescription: '',
    description: '',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString().split('T')[0],
    time: '10:00 AM',
    venue: '',
    capacity: 100,
    fee: 'Free',
    speaker: '',
    requirements: 'Student ID Card, Laptop',
    bannerImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80',
    tags: 'Hackathon, Campus',
  };

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    const loadClubs = async () => {
      try {
        const clubsData = await clubService.getAllClubs();
        setClubs(clubsData);
        if (clubsData.length > 0 && !formData.clubId) {
          setFormData((prev) => ({
            ...prev,
            clubId: clubsData[0]._id,
            clubName: clubsData[0].name,
          }));
        }
      } catch (e) {
        console.error(e);
      }
    };
    if (isOpen) loadClubs();
  }, [isOpen]);

  useEffect(() => {
    if (eventToEdit) {
      setFormData({
        ...eventToEdit,
        requirements: Array.isArray(eventToEdit.requirements)
          ? eventToEdit.requirements.join(', ')
          : eventToEdit.requirements || '',
        tags: Array.isArray(eventToEdit.tags) ? eventToEdit.tags.join(', ') : eventToEdit.tags || '',
      });
    } else {
      setFormData(initialForm);
    }
  }, [eventToEdit, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'clubId') {
      const selectedClub = clubs.find((c) => c._id === value);
      setFormData((prev) => ({
        ...prev,
        clubId: value,
        clubName: selectedClub ? selectedClub.name : prev.clubName,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      showToast('Event title is required', 'error');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        capacity: parseInt(formData.capacity, 10) || 100,
        requirements:
          typeof formData.requirements === 'string'
            ? formData.requirements.split(',').map((r) => r.trim()).filter(Boolean)
            : formData.requirements,
        tags:
          typeof formData.tags === 'string'
            ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean)
            : formData.tags,
      };

      if (eventToEdit) {
        await eventService.updateEvent(eventToEdit._id, payload);
        showToast('Event updated successfully', 'success');
      } else {
        await eventService.createEvent(payload);
        showToast('New event published to campus portal!', 'success');
      }

      if (onSaved) onSaved();
      onClose();
    } catch (err) {
      showToast(err.message || 'Failed to save event', 'error');
    } finally {
      setLoading(false);
    }
  };

  const categoryOptions = CLUB_CATEGORIES.filter((c) => c !== 'All');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={eventToEdit ? 'Edit Campus Event' : 'Schedule New Event'}
      subtitle="Publish workshops, fests, hackathons, and tournaments with seat limits."
      maxWidth="max-w-2xl"
      footer={
        <>
          <Button variant="outline" size="sm" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={handleSubmit} isLoading={loading}>
            {eventToEdit ? 'Update Event' : 'Publish Event'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Event Title"
          name="title"
          placeholder="e.g. HackCampus 2026: 36-Hour National Hackathon"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Host Club / Organization"
            name="clubId"
            type="select"
            value={formData.clubId}
            onChange={handleChange}
            options={clubs.map((c) => ({ value: c._id, label: c.name }))}
          />
          <Input
            label="Category"
            name="category"
            type="select"
            value={formData.category}
            onChange={handleChange}
            options={categoryOptions}
          />
        </div>

        <Input
          label="Short Teaser / Subtitle"
          name="shortDescription"
          placeholder="Brief 1-sentence hook for cards"
          value={formData.shortDescription}
          onChange={handleChange}
        />

        <Input
          label="Full Event Description & Schedule"
          name="description"
          type="textarea"
          rows={3}
          placeholder="Provide complete event details, rules, prizes, and guidelines..."
          value={formData.description}
          onChange={handleChange}
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input
            label="Event Date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <Input
            label="Time"
            name="time"
            placeholder="e.g. 10:00 AM"
            value={formData.time}
            onChange={handleChange}
            required
          />
          <Input
            label="Max Seat Capacity"
            name="capacity"
            type="number"
            value={formData.capacity}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Venue / Hall"
            name="venue"
            placeholder="e.g. Turing Block Auditorium"
            value={formData.venue}
            onChange={handleChange}
            required
          />
          <Input
            label="Registration Fee"
            name="fee"
            placeholder="e.g. Free or ₹100"
            value={formData.fee}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Guest Speaker / Chief Judge"
            name="speaker"
            placeholder="e.g. Arjun Gupta (Staff Architect)"
            value={formData.speaker}
            onChange={handleChange}
          />
          <Input
            label="Items to Bring (comma separated)"
            name="requirements"
            placeholder="Laptop, College ID, Resume"
            value={formData.requirements}
            onChange={handleChange}
          />
        </div>

        <Input
          label="Banner Image URL"
          name="bannerImage"
          placeholder="https://images.unsplash.com/..."
          value={formData.bannerImage}
          onChange={handleChange}
        />
      </form>
    </Modal>
  );
}
