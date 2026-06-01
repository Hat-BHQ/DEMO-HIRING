import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import './style.css';
import { ActivityItem } from '../../AboutPage';

type Props = {
    items: ActivityItem[];
}

const CompanyActivities = ({ items }: Props) => {
    return (
        <section className="company-activities" aria-labelledby="company-activities-title">
            <div className="">
                <div className="section-header company-activities-header">
                    <h2 id="company-activities-title">
                        HOẠT ĐỘNG <span className="highlight">CÔNG TY</span>
                    </h2>
                </div>

                <div className="container">
                    <Swiper
                        className="my-custom-carousel"
                        grabCursor={true}
                        slidesPerView={'auto'}
                        loop={true}
                        autoplay={{ delay: 2500, disableOnInteraction: false, pauseOnMouseEnter: true, }}
                        // observer={true}
                        // observeParents={true}
                        centeredSlides={true}
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
                </div>

                {/* Pagination nằm ngoài Swiper container */}
                <div className="ca-pagination" />
            </div>
        </section>
    );
};

export default CompanyActivities;