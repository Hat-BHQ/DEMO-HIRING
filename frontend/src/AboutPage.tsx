import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

type Brand = {
  id: 'hqsing' | 'hqaudios';
  name: string;
  description: string;
  website: string;
  image: string;
  mediaClassName: string;
  badgeClassName: string;
  badgeContent: React.ReactNode;
};

type BrandDetail = {
  modalTitle: string;
  subtitle: string;
  iconClass: string;
  ctaLabel: string;
  slogan: string;
  paragraphs: string[];
};

type VisionMissionItem = {
  id: 'vision' | 'mission';
  title: string;
  icon: string;
  image: string;
  imageAlt: string;
  paragraphs: string[];
};

type CoreValue = {
  id: string;
  title: string;
  icon: string;
  description: string;
};

type ActivityItem = {
  id: string;
  image: string;
  imageAlt: string;
};

const brands: Brand[] = [
  {
    id: 'hqsing',
    name: 'HQsing',
    description: 'HQsing là thương hiệu thuộc TOM Organization, chuyên cung cấp các giải pháp karaoke dành cho cộng đồng người ...',
    website: 'https://hqsing.com',
    image: '/image/hqsing-brand.png',
    mediaClassName: 'brand-card-media--hqsing',
    badgeClassName: 'brand-card-badge--square',
    badgeContent: (
      <>
        <span>HQ</span>
        <small>High Quality Sing</small>
      </>
    ),
  },
  {
    id: 'hqaudios',
    name: 'HQaudios',
    description: 'HQaudios là thương hiệu chuyên phục dựng và kinh doanh thiết bị âm thanh vintage, hi-fi và audio cổ điển cho thị trường Hoa Kỳ...',
    website: 'https://hqaudios.com',
    image: '/image/hqaudios-brand.png',
    mediaClassName: 'brand-card-media--hqaudios',
    badgeClassName: 'brand-card-badge--circle',
    badgeContent: <span>HQaudios</span>,
  },
];

const brandDetails: Record<Brand['id'], BrandDetail> = {
  hqsing: {
    modalTitle: 'Thương hiệu HQsing',
    subtitle: 'High Quality Sing',
    iconClass: 'fas fa-microphone-lines',
    ctaLabel: 'Truy cập',
    slogan: '"Sing Better. Feel More."',
    paragraphs: [
      'Thương hiệu thuộc TOM Organization, chuyên cung cấp các giải pháp karaoke dành cho cộng đồng người Việt tại Hoa Kỳ. Định hướng phát triển trải nghiệm giải trí gia đình hiện đại, HQsing tập trung vào sự dễ sử dụng, chất lượng âm thanh và khả năng kết nối cảm xúc thông qua âm nhạc.',
      'Khác với mô hình bán thiết bị karaoke đơn thuần, HQsing xây dựng hệ sinh thái trải nghiệm hoàn chỉnh từ tư vấn cấu hình, nội dung sản phẩm, hỗ trợ kỹ thuật đến vận hành thương mại điện tử cho thị trường Hoa Kỳ.',
      'Đội ngũ tại TOM Group Vietnam tham gia trực tiếp vào nhiều hoạt động cốt lõi của HQsing như marketing, media, vận hành hệ thống, hỗ trợ kỹ thuật, quản lý thương mại điện tử và phát triển trải nghiệm khách hàng cho thị trường quốc tế.',
    ],
  },
  hqaudios: {
    modalTitle: 'Thương hiệu HQaudios',
    subtitle: 'High Quality Audios',
    iconClass: 'fas fa-record-vinyl',
    ctaLabel: 'Truy cập',
    slogan: '"Classic Sound. Professionally Restored."',
    paragraphs: [
      'Thương hiệu chuyên phục dựng và kinh doanh thiết bị âm thanh vintage, hi-fi và audio cổ điển cho thị trường Hoa Kỳ. Với triết lý giữ lại giá trị nguyên bản của âm thanh cổ điển kết hợp cùng tiêu chuẩn kỹ thuật hiện đại, HQaudios hướng đến những khách hàng yêu thích trải nghiệm nghe nhạc chất lượng cao và bền vững theo thời gian.',
      'HQaudios tập trung vào các dòng loa, ampli và thiết bị hi-fi vintage được phục dựng, kiểm tra và hoàn thiện theo quy trình kỹ thuật chuyên nghiệp trước khi đến tay khách hàng. Không chỉ là hoạt động sửa chữa hay làm mới sản phẩm, HQaudios hướng đến việc tái tạo trải nghiệm âm thanh cổ điển với chất lượng vận hành ổn định cho nhu cầu sử dụng lâu dài.',
      'Tại TOM Group Vietnam, đội ngũ nhân sự tham gia trực tiếp vào quá trình R&amp;D, kỹ thuật phục dựng, kiểm định chất lượng, media sản phẩm, content marketing, thương mại điện tử và vận hành cho HQaudios. Đây là thương hiệu mang tính đặc thù cao về kỹ thuật và trải nghiệm sản phẩm, phù hợp với những nhân sự yêu thích công nghệ, audio, kỹ thuật hoặc muốn tham gia xây dựng sản phẩm cho thị trường quốc tế.',
    ],
  },
};

const visionMissionItems: VisionMissionItem[] = [
  {
    id: 'vision',
    title: 'Tầm nhìn',
    icon: '/image/icon-vision.png',
    image: '/image/vision-office.png',
    imageAlt: 'Không gian làm việc của đội ngũ TOM Group Vietnam',
    paragraphs: [
      'Trở thành doanh nghiệp hàng đầu tại Việt Nam chuyên xây dựng hệ sinh thái audio và lifestyle phục vụ thị trường quốc tế, nơi đội ngũ tại Việt Nam có thể tạo ra sản phẩm, vận hành và giá trị đạt tiêu chuẩn toàn cầu.',
    ],
  },
  {
    id: 'mission',
    title: 'Sứ mệnh',
    icon: '/image/icon-mission.png',
    image: '/image/mission-office.png',
    imageAlt: 'Đội ngũ TOM Group họp và phối hợp công việc',
    paragraphs: [
      'Mang đến những giải pháp karaoke, audio và trải nghiệm âm thanh chất lượng cao giúp khách hàng tận hưởng âm nhạc một cách dễ dàng, cảm xúc và bền vững hơn trong cuộc sống hằng ngày.',
      'Thông qua các thương hiệu HQsing và HQaudios, TOM Group Vietnam hướng đến việc kết nối giá trị công nghệ, chất lượng phục dựng và trải nghiệm giải trí cho cộng đồng người Việt toàn cầu, đặc biệt tại thị trường Hoa Kỳ.',
    ],
  },
];

const coreValues: CoreValue[] = [
  {
    id: 'ownership',
    title: 'Tinh thần làm chủ',
    icon: '/image/icon-cotloi1.png',
    description:
      'Không chờ giao việc mới hành động. Chủ động tìm vấn đề, giải quyết và chịu trách nhiệm với kết quả.',
  },
  {
    id: 'growth',
    title: 'Tư duy phát triển',
    icon: '/image/icon-cotloi2.png',
    description:
      'Luôn học hỏi, cải tiến và nâng cấp năng lực để thích nghi với tốc độ tăng trưởng của doanh nghiệp.',
  },
  {
    id: 'impact',
    title: 'Hướng đến kết quả',
    icon: '/image/icon-cotloi3.png',
    description:
      'Đánh giá bằng hiệu quả và giá trị tạo ra, không chỉ bằng nỗ lực hay thời gian làm việc.',
  },
  {
    id: 'discipline',
    title: 'Hệ thống và kỷ luật',
    icon: '/image/icon-cotloi4.png',
    description:
      'Xây quy trình rõ ràng, vận hành chuẩn có tiêu chuẩn để tạo hiệu suất và khả năng scale lâu dài.',
  },
  {
    id: 'global-standard',
    title: 'Tiêu chuẩn quốc tế',
    icon: '/image/icon-cotloi5.png',
    description:
      'Tư duy chất lượng, tốc độ và tính chuyên nghiệp hướng đến thị trường Hoa Kỳ và khách hàng toàn cầu.',
  },
  {
    id: 'partnership',
    title: 'Đồng hành dài hạn',
    icon: '/image/icon-cotloi6.png',
    description:
      'Ưu tiên xây dựng đội ngũ và mối quan hệ phát triển bền vững cùng doanh nghiệp theo thời gian.',
  },
];

const activityItems: ActivityItem[] = [
  {
    id: 'activity-workshop',
    image: '/image/HD-congty.png',
    imageAlt: 'Workshop nội bộ của công ty',
  },
  {
    id: 'activity-event',
    image: '/image/HD-congty-2.png',
    imageAlt: 'Sự kiện tổng kết cùng đội ngũ',
  },
  {
    id: 'activity-green',
    image: '/image/HD-congty-3.png',
    imageAlt: 'Hoạt động môi trường của công ty',
  },
  
];

function BrandFallbackVisual({ brandId }: { brandId: Brand['id'] }) {
  if (brandId === 'hqsing') {
    return (
      <div className="brand-card-product" aria-hidden="true">
        <div className="product-speaker"></div>
        <div className="product-mic product-mic--one"></div>
        <div className="product-mic product-mic--two"></div>
      </div>
    );
  }

  return (
    <div className="brand-card-vintage" aria-hidden="true">
      <div className="vintage-speaker vintage-speaker--dark">
        <div className="speaker-tweeter"></div>
        <div className="speaker-woofer"></div>
      </div>
      <div className="vintage-speaker vintage-speaker--wood">
        <div className="speaker-tweeter"></div>
        <div className="speaker-woofer"></div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  const [clickedBrand, setClickedBrand] = useState<Brand['id'] | null>(null);
  const [imageFallbacks, setImageFallbacks] = useState<Brand['id'][]>([]);
  const [visionMissionFallbacks, setVisionMissionFallbacks] = useState<VisionMissionItem['id'][]>([]);
  const [activityIndex, setActivityIndex] = useState(0);
  const [activityFallbacks, setActivityFallbacks] = useState<string[]>([]);
  const [activeBrandId, setActiveBrandId] = useState<Brand['id'] | null>(null);
  const activeBrand = activeBrandId ? brands.find(brand => brand.id === activeBrandId) ?? null : null;
  const activeBrandDetail = activeBrandId ? brandDetails[activeBrandId] : null;

  const triggerBrandEffect = (brandId: Brand['id']) => {
    setClickedBrand(brandId);

    window.setTimeout(() => {
      setClickedBrand(current => (current === brandId ? null : current));
    }, 360);
  };

  const handleImageError = (brandId: Brand['id']) => {
    setImageFallbacks(current => (current.includes(brandId) ? current : [...current, brandId]));
  };

  const handleVisionMissionImageError = (itemId: VisionMissionItem['id']) => {
    setVisionMissionFallbacks(current => (current.includes(itemId) ? current : [...current, itemId]));
  };

  const handleActivityImageError = (activityId: string) => {
    setActivityFallbacks(current => (current.includes(activityId) ? current : [...current, activityId]));
  };

  const visibleActivities = Array.from({ length: Math.min(3, activityItems.length) }, (_, offset) => {
    return activityItems[(activityIndex + offset) % activityItems.length];
  });

  const goToNextActivity = () => {
    setActivityIndex(current => (current + 1) % activityItems.length);
  };

  const goToPrevActivity = () => {
    setActivityIndex(current => (current - 1 + activityItems.length) % activityItems.length);
  };

  useEffect(() => {
    if (activityItems.length <= 1) {
      return;
    }

    const timerId = window.setInterval(() => {
      setActivityIndex(current => (current + 1) % activityItems.length);
    }, 2000);

    return () => {
      window.clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveBrandId(null);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (activeBrandId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [activeBrandId]);

  return (
    <>
      <Header/>
      <section className="about-banner-section" aria-label="Banner giới thiệu">
        <div className="about-banner-frame">
          <img
            src="/image/Banner_gioithieu.png"
            alt="Banner giới thiệu TOM Group Vietnam"
            className="about-banner-image"
          />
        </div>
      </section>
      <section className="brand-showcase" aria-labelledby="brand-showcase-title">
        <div className="container">
          <div className="section-header brand-showcase-header">
            <h2 id="brand-showcase-title">
              THƯƠNG HIỆU <span className="highlight">ĐANG HOẠT ĐỘNG</span>
            </h2>
          </div>

          <div className="brand-showcase-grid">
            {brands.map(brand => {
              const useFallback = imageFallbacks.includes(brand.id);

              return (
                <article
                  className="brand-card"
                  key={brand.id}
                  onClick={() => setActiveBrandId(brand.id)}
                  onKeyDown={event => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      setActiveBrandId(brand.id);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <button
                    type="button"
                    className={`brand-card-media-button ${clickedBrand === brand.id ? 'is-clicked' : ''}`.trim()}
                    onClick={() => triggerBrandEffect(brand.id)}
                    aria-label={`Hiệu ứng hình ảnh ${brand.name}`}
                  >
                    <div className={`brand-card-media ${brand.mediaClassName}`.trim()}>
                      <div className={`brand-card-badge ${brand.badgeClassName}`.trim()}>
                        {brand.badgeContent}
                      </div>

                      {useFallback ? (
                        <BrandFallbackVisual brandId={brand.id} />
                      ) : (
                        <img
                          src={brand.image}
                          alt={brand.name}
                          className="brand-card-media-image"
                          onError={() => handleImageError(brand.id)}
                        />
                      )}

                      <span className="brand-card-click-hint">Nhấp để xem hiệu ứng</span>
                    </div>
                  </button>

                  <div className="brand-card-body">
                    <h3>{brand.name}</h3>
                    <p>{brand.description}</p>
                    <a
                      href={brand.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="brand-link"
                      onClick={event => event.stopPropagation()}
                    >
                      <i className="fas fa-globe" aria-hidden="true"></i>
                      <span>Địa chỉ website</span>
                      <strong>{brand.website.replace('https://', '')}</strong>
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {activeBrand && activeBrandDetail && (
        <div className="brand-modal-overlay" onClick={() => setActiveBrandId(null)} role="presentation">
          <div className="brand-modal" role="dialog" aria-modal="true" aria-label={activeBrandDetail.modalTitle} onClick={event => event.stopPropagation()}>
            <div className="brand-modal-header">
              <h3>{activeBrandDetail.modalTitle}</h3>
              <button type="button" className="brand-modal-close" onClick={() => setActiveBrandId(null)} aria-label="Đóng popup">
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="brand-modal-body">
              <div className="brand-modal-intro">
                <span className="brand-modal-logo" aria-hidden="true">
                  <i className={activeBrandDetail.iconClass}></i>
                </span>

                <div className="brand-modal-intro-content">
                  <h4>
                    {activeBrand.name}
                    <span>({activeBrandDetail.subtitle})</span>
                  </h4>
                  <a href={activeBrand.website} target="_blank" rel="noopener noreferrer" className="brand-modal-cta">
                    {activeBrandDetail.ctaLabel}
                  </a>
                </div>
              </div>

              <div className="brand-modal-content">
                {activeBrandDetail.paragraphs.map((paragraph, index) => (
                  <>
                    <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                    {index === 0 && activeBrandDetail.slogan && (
                      <div className="brand-modal-slogan">
                        <span>Slogan của thương hiệu:</span>
                        <em>{activeBrandDetail.slogan}</em>
                      </div>
                    )}
                  </>
                ))}
              </div>

              <p className="brand-modal-website">
                <i className="fas fa-globe"></i>
                <span>Địa chỉ website:</span>
                <a href={activeBrand.website} target="_blank" rel="noopener noreferrer">
                  {activeBrand.website.replace('https://', '')}
                </a>
              </p>
            </div>
          </div>
        </div>
      )}

      <section className="vision-mission" aria-labelledby="vision-mission-title">
        <div className="container">
          <div className="section-header vision-mission-header">
            <h2 id="vision-mission-title">
              TẦM NHÌN <span className="highlight">&amp; SỨ MỆNH</span>
            </h2>
          </div>

          <div className="vision-mission-list">
            {visionMissionItems.map((item, index) => {
              const isImageMissing = visionMissionFallbacks.includes(item.id);

              return (
                <article
                  key={item.id}
                  className={`vision-mission-row ${index % 2 === 1 ? 'vision-mission-row--reverse' : ''}`.trim()}>
                  <div className="vision-mission-content">
                    <span className="vision-mission-icon" aria-hidden="true">
                      {item.icon.startsWith('/') ? (
                        <img src={item.icon} alt="" className="vision-mission-icon-image" />
                      ) : (
                        <i className={item.icon}></i>
                      )}
                    </span>
                    <h3>{item.title}</h3>
                    {item.paragraphs.map(paragraph => (
                      <p key={`${item.id}-${paragraph.slice(0, 24)}`}>{paragraph}</p>
                    ))}
                  </div>

                  <div className="vision-mission-image-wrap" aria-label={`Hình minh họa ${item.title}`}>
                    {isImageMissing ? (
                      <div className="vision-mission-image-placeholder"></div>
                    ) : (
                      <img
                        src={item.image}
                        alt={item.imageAlt}
                        className="vision-mission-image"
                        onError={() => handleVisionMissionImageError(item.id)}/>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      
      <section className="core-values" aria-labelledby="core-values-title">
        <div className="container">
          <div className="section-header core-values-header">
            <h2 id="core-values-title">
              GIÁ TRỊ <span className="highlight">CỐT LÕI</span>
            </h2>
          </div>

          <div className="core-values-grid">
            {coreValues.map(value => (
              <article className="core-value-card" key={value.id}>
                <span className="core-value-icon" aria-hidden="true">
                  {value.icon.startsWith('/') ? (
                    <img src={value.icon} alt="" className="core-value-icon-image" />
                  ) : (
                    <i className={value.icon}></i>
                  )}
                </span>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="company-activities" aria-labelledby="company-activities-title">
        <div className="container">
          <div className="section-header company-activities-header">
            <h2 id="company-activities-title">
              HOẠT ĐỘNG <span className="highlight">CÔNG TY</span>
            </h2>
          </div>

          <div className="activities-carousel">
            <button
              type="button"
              className="activities-arrow activities-arrow--prev"
              onClick={goToPrevActivity}
              aria-label="Xem hoạt động trước">
              <i className="fas fa-chevron-left" aria-hidden="true"></i>
            </button>

            <div className="activities-grid">
              {visibleActivities.map(activity => {
                const isImageMissing = activityFallbacks.includes(activity.id);

                return (
                  <article className="activity-card" key={`${activity.id}-${activityIndex}`}>
                    {isImageMissing ? (
                      <div className="activity-card-placeholder"></div>
                    ) : (
                      <img
                        src={activity.image}
                        alt={activity.imageAlt}
                        className="activity-card-image"
                        onError={() => handleActivityImageError(activity.id)}
                      />
                    )}
                  </article>
                );
              })}
            </div>

            <button
              type="button"
              className="activities-arrow activities-arrow--next"
              onClick={goToNextActivity}
              aria-label="Xem hoạt động kế tiếp">
              <i className="fas fa-chevron-right" aria-hidden="true"></i>
            </button>
          </div>

          <div className="activities-dots" role="tablist" aria-label="Điều hướng hoạt động công ty">
            {activityItems.map((activity, index) => (
              <button
                type="button"
                key={activity.id}
                role="tab"
                aria-selected={index === activityIndex}
                aria-label={`Đến hoạt động ${index + 1}`}
                className={`activities-dot ${index === activityIndex ? 'is-active' : ''}`.trim()}
                onClick={() => setActivityIndex(index)}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}