import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useAlert } from '../../hooks/useAlert';
import Input from '../common/Input';
import Button from '../common/Button';
import { Mail, Lock, User, Hash, Building2, ArrowRight } from 'lucide-react';
import { validateEmail, validatePassword, validateRequired, validateRollNumber } from '../../utils/validators';
import { USER_ROLES } from '../../utils/constants';

export default function RegisterForm() {
  const { register } = useAuth();
  const { showToast } = useAlert();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rollNo: '',
    department: 'Computer Science & Engineering',
    semester: '1st Semester',
    role: USER_ROLES.STUDENT,
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const departments = [
    'Computer Science & Engineering',
    'Electronics & Communication Engineering',
    'Mechanical Engineering',
    'Applied Sciences & AI',
    'Business School / MBA',
    'Pharmacy & Health Sciences',
    'Design & Architecture',
  ];

  const semesters = [
    '1st Semester',
    '2nd Semester',
    '3rd Semester',
    '4th Semester',
    '5th Semester',
    '6th Semester',
    '7th Semester',
    '8th Semester',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const errs = {};
    const nameErr = validateRequired(formData.name, 'Full name');
    if (nameErr) errs.name = nameErr;

    const emailErr = validateEmail(formData.email);
    if (emailErr) errs.email = emailErr;

    if (formData.role === USER_ROLES.STUDENT) {
      const rollErr = validateRollNumber(formData.rollNo);
      if (rollErr) errs.rollNo = rollErr;
    }

    const passErr = validatePassword(formData.password);
    if (passErr) errs.password = passErr;

    if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await register(formData);
      showToast('Registration successful! Welcome to CampusConnect.', 'success');
      navigate(formData.role === USER_ROLES.ADMIN ? '/admin/dashboard' : '/student/dashboard');
    } catch (err) {
      showToast(err.message || 'Registration failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1.5">
            Register As <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, role: USER_ROLES.STUDENT }))}
              className={`p-3 rounded-md border text-sm font-semibold transition-colors cursor-pointer ${
                formData.role === USER_ROLES.STUDENT
                  ? 'border-[#1e3a5f] bg-[#1e3a5f]/10 text-[#1e3a5f]'
                  : 'border-slate-200 bg-slate-50 text-slate-500 hover:bg-white hover:border-slate-300'
              }`}
            >
              🎓 Student
            </button>
            <button
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, role: USER_ROLES.ADMIN }))}
              className={`p-3 rounded-md border text-sm font-semibold transition-colors cursor-pointer ${
                formData.role === USER_ROLES.ADMIN
                  ? 'border-[#1e3a5f] bg-[#1e3a5f]/10 text-[#1e3a5f]'
                  : 'border-slate-200 bg-slate-50 text-slate-500 hover:bg-white hover:border-slate-300'
              }`}
            >
              🛡️ Faculty / Club Lead
            </button>
          </div>
        </div>

        <Input
          label="Full Name"
          name="name"
          placeholder="e.g. Aarav Sharma"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          icon={User}
          required
        />

        <Input
          label="College Email Address"
          name="email"
          type="email"
          placeholder="e.g. yourname@chitkara.edu.in"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          icon={Mail}
          required
        />

        {formData.role === USER_ROLES.STUDENT && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Roll Number"
              name="rollNo"
              placeholder="e.g. 2310990001"
              value={formData.rollNo}
              onChange={handleChange}
              error={errors.rollNo}
              icon={Hash}
              required
            />
            <Input
              label="Semester"
              name="semester"
              type="select"
              value={formData.semester}
              onChange={handleChange}
              options={semesters}
            />
          </div>
        )}

        <Input
          label="Department / Faculty"
          name="department"
          type="select"
          value={formData.department}
          onChange={handleChange}
          options={departments}
          icon={Building2}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Min. 6 characters"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            icon={Lock}
            required
          />

          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="Re-type password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            icon={Lock}
            required
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          className="w-full mt-3"
          isLoading={loading}
          iconRight={ArrowRight}
        >
          Create {formData.role === USER_ROLES.ADMIN ? 'Faculty' : 'Student'} Account
        </Button>
      </form>

      <p className="mt-6 text-center text-xs text-slate-500">
        Already registered?{' '}
        <Link to="/login" className="text-[#1e3a5f] font-semibold hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  );
}
