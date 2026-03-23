import { useState, useRef, useCallback, useEffect } from 'react';
import { useLang } from '../contexts/LangContext';
import { submitApplication } from '../services/api';
import type { Job } from '../types';

interface Props {
  job: Job;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ApplyModal({ job, onClose, onSuccess }: Props) {
  const { t } = useLang();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const validate = useCallback((): boolean => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = t('applyErrName');
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = t('applyErrEmail');
    if (!phone.trim() || !/^[0-9\s+\-]{8,15}$/.test(phone)) errs.phone = t('applyErrPhone');
    if (!cvFile) errs.cv = t('applyErrCV');
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [name, email, phone, cvFile, t]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !cvFile) return;
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('full_name', name.trim());
      formData.append('email', email.trim());
      formData.append('phone', phone.trim());
      formData.append('job_id', job.id);
      formData.append('cv', cvFile);
      await submitApplication(formData);
      onClose();
      onSuccess();
    } catch {
      setErrors({ form: 'Something went wrong. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) setCvFile(file);
  }, []);

  return (
    <div className="apply-modal-overlay open" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="apply-modal">
        <button className="modal-close" onClick={onClose}><i className="fas fa-times"></i></button>
        <div className="apply-modal-header">
          <div className="apply-modal-icon"><i className="fas fa-paper-plane"></i></div>
          <h2>{t('applyFormTitle')}</h2>
          <p className="apply-modal-job-title">{job.title}</p>
        </div>
        <form className="apply-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label>{t('applyLabelName')} <span className="required">*</span></label>
            <input
              type="text"
              placeholder={t('applyPlaceholderName')}
              value={name}
              onChange={e => setName(e.target.value)}
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="form-error">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label>{t('applyLabelEmail')} <span className="required">*</span></label>
            <input
              type="email"
              placeholder={t('applyPlaceholderEmail')}
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label>{t('applyLabelPhone')} <span className="required">*</span></label>
            <input
              type="tel"
              placeholder={t('applyPlaceholderPhone')}
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className={errors.phone ? 'error' : ''}
            />
            {errors.phone && <span className="form-error">{errors.phone}</span>}
          </div>
          <div className="form-group">
            <label>{t('applyLabelCV')} <span className="required">*</span></label>
            <div
              className="cv-upload-area"
              onDragOver={e => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={e => { if (e.target.files?.[0]) setCvFile(e.target.files[0]); }}
                style={{ display: 'none' }}
              />
              {cvFile ? (
                <div className="cv-file-chosen" style={{ display: 'flex' }}>
                  <i className="fas fa-file-alt"></i>
                  <span>{cvFile.name}</span>
                  <button type="button" className="cv-remove-btn" onClick={e => { e.stopPropagation(); setCvFile(null); }}>
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ) : (
                <div className="cv-upload-placeholder">
                  <i className="fas fa-cloud-upload-alt"></i>
                  <p>{t('applyUploadHint')}</p>
                  <span>{t('applyUploadFormats')}</span>
                </div>
              )}
            </div>
            {errors.cv && <span className="form-error">{errors.cv}</span>}
          </div>
          {errors.form && <span className="form-error">{errors.form}</span>}
          <button type="submit" className="btn-submit-apply" disabled={submitting}>
            <span>{submitting ? '...' : t('applyBtnSubmit')}</span>
            <i className="fas fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </div>
  );
}
