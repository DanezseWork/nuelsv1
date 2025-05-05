
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export const Feature6 = () => (
  <motion.div 
    id="serviceSection"
    initial="hidden" 
    whileInView="visible" 
    viewport={{ once: false, amount: 0.2 }}
    className="w-full py-20 lg:py-40 bg-transparent relative"
  >
    <div className="container mx-auto">
      <motion.div className="flex flex-col gap-10">
        <motion.div className="flex gap-4 flex-col items-start" variants={fadeInUp}>
          <div className="flex gap-2 flex-col">
            <h2 className="text-3xl md:text-5xl tracking-tighter font-bold text-left text-primary [text-shadow:0_0_10px_rgb(250,204,21)]">
              Beauty Services Tailored for You
            </h2>
            <p className="text-lg leading-relaxed tracking-tight text-white text-left">
              Experience professional hair styling and makeup services designed to bring out your best features.
            </p>
          </div>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 z-20"
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: false, amount: 0.2 }}
        >
          {[  
            { img: "/images/services/1.jpg", title: "Flawless Makeup", desc: "Whether it’s for a night out or your big day, our makeup artists will create the perfect look for you.", span: "lg:col-span-2" },
            { img: "/images/services/7.jpg", title: "Quality Makeup", desc: "We use top-tier, skin-friendly makeup brands" },
            { img: "/images/services/6.jpg", title: "Variety of Choice", desc: "Beauty services tailored to your needs and preferences" },
            { img: "/images/services/2.jpg", title: "Flexible Booking", desc: "We offer flexible booking options to suit your schedule", span: "lg:col-span-2" }
          ].map((item, index) => (
            <motion.div 
              key={index} 
              className={`bg-secondary rounded-md h-full lg:aspect-auto flex-col ${item.span || ''}`}
              variants={fadeInUp}
            >
              <img src={item.img} alt={item.title} className="w-full h-[400px] sm:h-[150px] md:h-[300px] object-cover rounded-t-md" />
              <div className="flex flex-col p-5">
                <h3 className="text-xl tracking-tight text-yellow-500">{item.title}</h3>
                <p className="text-white text-base">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  </motion.div>
);
