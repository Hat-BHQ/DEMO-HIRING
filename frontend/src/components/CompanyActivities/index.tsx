import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import './style.css';
import { ActivityItem } from '../../AboutPage';
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu';

type Props = {
    items: ActivityItem[];
}

const CompanyActivities = ({ items }: Props) => {
    const swiperRef = useRef<SwiperType | null>(null);

    return (
        <section className="company-activities" aria-labelledby="company-activities-title">
            <div className="">
                <div className="section-header company-activities-header">
                    <h2 id="company-activities-title">
                        HOẠT ĐỘNG <span className="highlight">CÔNG TY</span>
                    </h2>
                </div>

                <div className="ca-carousel-wrapper container">
                    <button
                        type="button"
                        className="ca-nav ca-nav--prev"
                        aria-label="Xem ảnh trước"
                        onClick={() => swiperRef.current?.slidePrev()}
                    >
                        {/* <i className="fas fa-chevron-left" aria-hidden="true" /> */}
                        <LuArrowLeft size={20} />
                    </button>

                    <Swiper
                        className="my-custom-carousel"
                        grabCursor={true}
                        slidesPerView={'auto'}
                        loop={true}
                        autoplay={{ delay: 5500, disableOnInteraction: false, pauseOnMouseEnter: true }}
                        centeredSlides={true}
                        onSwiper={(swiper) => { swiperRef.current = swiper; }}
                        breakpoints={{
                            768: { slidesPerView: 3 },
                            1024: { slidesPerView: 3 },
                        }}
                        pagination={{
                            el: '.ca-pagination',
                            clickable: true,
                            bulletClass: 'ca-dot',
                            bulletActiveClass: 'ca-dot--active',
                        }}
                        modules={[Autoplay, Pagination]}
                    >
                        {items.map((item, index) => (
                            <SwiperSlide key={item.id + index}>
                                <img src={item.image} alt={item.imageAlt} loading="eager" />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <button
                        type="button"
                        className="ca-nav ca-nav--next"
                        aria-label="Xem ảnh tiếp theo"
                        onClick={() => swiperRef.current?.slideNext()}
                    >
                        <LuArrowRight size={20} />
                    </button>
                </div>

                {/* Pagination nằm ngoài Swiper container */}
                <div className="ca-pagination" />
            </div>
        </section>
    );
};

export default CompanyActivities;