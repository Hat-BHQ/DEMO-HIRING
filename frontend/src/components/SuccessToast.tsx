import { useLang } from '../contexts/LangContext';

interface Props {
  visible: boolean;
}

export default function SuccessToast({ visible }: Props) {
  const { t } = useLang();

  return (
    <div className={`success-toast${visible ? ' show' : ''}`}>
      <div className="success-toast-content">
        <div className="success-toast-icon"><i className="fas fa-check-circle"></i></div>
        <div className="success-toast-text">
          <strong>{t('applySuccessTitle')}</strong>
          <span>{t('applySuccessDesc')}</span>
        </div>
      </div>
    </div>
  );
}
