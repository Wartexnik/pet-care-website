DROP DATABASE petcare;
CREATE DATABASE petcare;
USE petcare;

CREATE TABLE user (
    id INT AUTO_INCREMENT,
    name VARCHAR(50),
    email VARCHAR(50),
    phone VARCHAR(50),
    password_hash CHAR(60),
    PRIMARY KEY (id)
);

CREATE TABLE service (
    id INT AUTO_INCREMENT,
    slug VARCHAR(50),
    name VARCHAR(50),
    img_path VARCHAR(50),
    description_short VARCHAR(2000),
    description_long VARCHAR(10000),
    base_price INT,
    PRIMARY KEY (id)
);

CREATE TABLE pet_type (
    id INT AUTO_INCREMENT,
    name VARCHAR(50), 
    price_mod INT,
    PRIMARY KEY (id)
);

CREATE TABLE pet (
    id INT AUTO_INCREMENT,
    name VARCHAR(50),
    pet_type_id INT,
    owner_id INT
    PRIMARY KEY (id),
    FOREIGN KEY (pet_type_id)
        REFERENCES pet_type(id)
        ON DELETE SET NULL,
    FOREIGN KEY (owner_id)
        REFERENCES user(id)
        ON DELETE SET NULL
);

CREATE TABLE order (
    id INT AUTO_INCREMENT,
    service_id INT,
    pet_id INT,
    comments VARCHAR(50),
    PRIMARY KEY (id),
    FOREIGN KEY (pet_type_id)
        REFERENCES pet_type(id)
        ON DELETE SET NULL,
    FOREIGN KEY (owner_id)
        REFERENCES user(id)
        ON DELETE SET NULL
);

INSERT INTO user (
    name,
    email,
    password_hash
)
VALUES 
(
    'Oleksii',
    'alexey.nakhod@gmail.com',
    '$2a$12$V1vo5iRM33tdkeRw4scmbuGeq1Sl4W8ugGNn9xkhnELjKN2GLcZUK'
);

INSERT INTO pet_type (
    name,
    price_mod
)
VALUES (
    'Dog',
    30000
),
(
    'Cat',
    30000
),
(
    'Bird',
    15000
),
(
    'Reptile',
    15000
),
(
    'Horse',
    50000
),
(
    'Fish',
    10000
);

INSERT INTO service (
    name,
    slug,
    base_price,
    img_path,
    description_short,
    description_long
)
VALUES (
    'Pet Sitting',
    'pet-sitting',
    10000,
    '/resources/pet-sitting.png',
    "Our pet sitting service offers professional and reliable care for your beloved pets while you're away. We provide experienced pet sitters who will ensure your furry friends are fed, exercised, and given plenty of love and attention. With our pet sitting service, you can enjoy peace of mind knowing that your pets are in safe hands.",
    "We understand that your pets are not just animals; they are members of your family. When life gets busy or you need to travel, it can be challenging to find someone trustworthy and dependable to care for your furry friends. 
    That's where our pet sitting service comes in.
    Our dedicated team of experienced pet sitters is committed to providing exceptional care for your pets in the comfort of their own familiar environment. We offer a range of services tailored to meet the unique needs of each pet, ensuring they receive the personalized attention and care they deserve.
    When you choose our pet sitting service, you can rest assured that your pets will receive the highest level of care. Our professional pet sitters are not only passionate animal lovers, but they also have the knowledge and experience to handle various breeds and temperaments. Whether you have a playful puppy, a curious kitten, or a senior dog with special needs, our pet sitters will adapt to their specific requirements, ensuring their comfort and well-being.
    During each visit, our pet sitters will provide your pets with fresh food and water, administer any necessary medications, and follow any specific dietary instructions you provide. We understand that exercise is crucial for the physical and mental health of your pets, so our sitters will engage them in stimulating playtime and walks to keep them active and entertained.
    Beyond the essential care, our pet sitters will also provide companionship and affection to help ease any separation anxiety your pets may experience. They will spend quality time with your pets, engaging in activities they enjoy, such as playing with toys, brushing their fur, or simply cuddling up for some much-needed affection.
    We prioritize the safety and security of your pets and your home. Our pet sitters are extensively screened and trained, and we have comprehensive protocols in place to ensure your pets are always in capable and reliable hands. We also offer the option for in-home consultations before the pet sitting service begins, allowing you to meet the sitter and discuss any specific requirements or concerns.
    We understand that each pet is unique, and our goal is to provide a personalized pet sitting experience that exceeds your expectations. Whether you need our services for a short weekend getaway or an extended vacation, we are here to provide the love, care, and attention your pets deserve. With our pet sitting service, you can enjoy your time away with peace of mind, knowing that your furry friends are safe, comfortable, and happy in their own home."
),
(
    'Pet Walking',
    'pet-walking',
    20000,
    '/resources/pet-walking.jpg',
    "Experience worry-free pet care with our professional pet walking service. Whether you're a busy professional or just need an extra hand, our dedicated team of animal enthusiasts will ensure your furry friends receive the exercise and attention they deserve. With personalized walks tailored to your pet's needs, you can trust us to keep your pets happy, healthy, and entertained while you're away. Relax and let us take the leash, knowing your pets are in safe and loving hands.",
    "Introducing our premier pet walking service, where we go the extra mile to provide exceptional care for your beloved furry companions. We understand that your pets are not just animals but cherished members of your family, and we are dedicated to ensuring their well-being and happiness.
    Our team of experienced and passionate pet walkers is committed to providing top-notch service that exceeds your expectations. We know that each pet has unique needs and personalities, which is why we offer personalized walks tailored to suit your pet's specific requirements. Whether your dog loves a brisk jog, a leisurely stroll, or prefers to take their time exploring their surroundings, we adapt our walks to cater to their preferences and energy levels.
    When you entrust your pets to us, you can have peace of mind knowing that they are in the hands of caring professionals. Our walkers are not only knowledgeable about various breeds and their temperaments, but they are also trained in pet first aid and emergency procedures. Your pet's safety is our utmost priority, and we take every precaution to ensure they are secure throughout the entire walking experience.
    Flexibility and convenience are key components of our service. We offer flexible scheduling options to accommodate your busy lifestyle, allowing you to select the best times and duration for your pet's walks. Whether you need regular walks on weekdays or occasional walks during weekends and holidays, we are here to cater to your schedule.
    In addition to exercise, our pet walkers understand the importance of mental stimulation and socialization for your pets. During walks, we engage your furry friends with interactive play, stimulating their minds and keeping them entertained. We also carefully introduce them to other friendly dogs, providing opportunities for social interaction, which can greatly contribute to their overall well-being and happiness.
    Our commitment to quality extends beyond the walks themselves. We prioritize open and transparent communication with our clients, keeping you updated on your pet's progress, behavior, and any special observations we make during our time together. We believe in building strong relationships with both our human and furry clients, and we encourage you to share any specific instructions, concerns, or feedback you may have.
    At our pet walking service, we go above and beyond to provide the care, attention, and love that your pets deserve. We are here to make their day brighter, their tails wag with joy, and their walks a truly enjoyable experience. So why not give your pets the gift of exercise, companionship, and adventure? Trust us to be your reliable and dedicated pet walking partner, ensuring your pets remain happy, healthy, and content while you're away."
),
(
    'Overnight Care',
    'overnight-care',
    15000,
    '/resources/overnight-care.jpg',
    "Our Overnight Care service provides dedicated caregivers who stay overnight in your home. We offer companionship, feeding, walks, playtime, and medication administration for your pet. With our vigilant attention and a focus on maintaining routines, we ensure your pet receives comfort and security throughout the night, so they wake up refreshed and ready for the day.",
    "Introducing our exclusive Overnight Pet Care service, specially designed to provide exceptional care and comfort for your beloved pets throughout the night. When you're unable to be by their side or away from home, our dedicated caregivers ensure that your furry companions receive the attention and supervision they deserve.
    Our experienced and compassionate pet caregivers stay overnight in the comfort of your own home, creating a familiar and soothing environment for your pets. They offer round-the-clock companionship, ensuring that your pets feel secure and at ease throughout the night. Whether you have a playful pup, a curious kitty, or any other small animal, our caregivers are trained to cater to their unique needs.
    During our Overnight Pet Care service, our caregivers go above and beyond to keep your pets happy and content. They provide essential services such as feeding, administering medication (if needed), taking dogs for late-night walks or potty breaks, engaging in playtime and exercise, and offering plenty of snuggles and cuddles. We understand the importance of maintaining your pet's regular routine to minimize any anxiety or disruption.
    Rest assured, our caregivers are always vigilant and attentive to your pet's well-being. They are well-versed in basic pet first aid and can promptly respond to any emergencies or health concerns that may arise during the night. You can have peace of mind knowing that your furry companions are in capable hands.
    Our Overnight Pet Care service is the perfect solution for pet owners who need to be away from home overnight but still want their pets to receive personalized care and attention. With our dedicated caregivers, your pets can enjoy a stress-free evening and a peaceful night's sleep, ensuring they wake up refreshed and ready for a brand new day.
    Invest in your pet's happiness and well-being with our exceptional Overnight Pet Care service. Contact us today to schedule a worry-free night for your furry friend!"
),
(
    'Pet Taxi',
    'pet-taxi',
    20000,
    '/resources/pet-taxi.png',
    "The Pet Taxi service is a convenient and reliable transportation solution designed to ensure the safe and comfortable travel of pets. Whether it's a trip to the veterinarian, a grooming appointment, or even a visit to a pet park, our dedicated and experienced pet taxi drivers provide a stress-free experience for pets and their owners.",
    "The Pet Taxi service is a comprehensive and professional transportation solution designed to cater to the unique needs of pets and their owners. We understand that there are times when pet owners are unable to personally transport their furry friends due to busy schedules, health issues, or other commitments. That's where our Pet Taxi service comes in, providing a convenient and reliable option for pet transportation.
    Our Pet Taxi service is staffed by dedicated and experienced pet taxi drivers who are passionate about animals and committed to ensuring their safety and comfort during transit. Our drivers undergo thorough background checks and are trained to handle pets with care and professionalism. They have a deep understanding of animal behavior and are equipped with the necessary skills to provide a stress-free experience for both pets and their owners.
    Safety is our utmost priority, and we have taken every precaution to ensure the well-being of pets during their journey. Our vehicles are specially designed and equipped with secure and comfortable crates to ensure that pets are transported safely and securely. The crates are spacious, well-ventilated, and cleaned regularly to maintain hygiene standards. We strictly adhere to safety protocols, including proper restraint and securing of pets to prevent any accidents or escapes.
    At our company, we are committed to delivering exceptional service and creating a positive experience for both pets and their owners. With our Pet Taxi service, pet owners can rest assured that their beloved companions are in capable hands, allowing them to focus on their busy schedules with peace of mind. Whether it's a one-time need or a regular transportation requirement, our Pet Taxi service is here to make pet transportation hassle-free, convenient, and comfortable for everyone involved."
),
(
    'Pet Medical Administration',
    'pet-medical-administration',
    40000,
    '/resources/pet-medical-administration.jpg',
    "Our Pet Medical Administration service provides professional and compassionate assistance in administering medication to pets. We understand that administering medication to pets can be a challenging and stressful task for many pet owners, especially when dealing with finicky eaters or pets who are uncooperative. Our experienced and trained staff are skilled in administering various forms of medication, including pills, liquids, injections, and topical treatments. With utmost care and patience, we ensure that pets receive their required medications accurately and in a stress-free manner, providing peace of mind to pet owners and promoting their pets' overall health and well-being.",
    "Introducing our comprehensive Pet Medical Administration service, a revolutionary offering designed to provide top-notch veterinary care and ensure the health and well-being of your beloved pets. At our Pet Care company, we understand the deep bond between you and your furry companions, and we are committed to going the extra mile to keep them happy, healthy, and thriving.
    Our Pet Medical Administration service is a one-stop solution that encompasses a wide range of veterinary services, seamlessly integrating medical care, record-keeping, medication management, and personalized attention. With a team of highly skilled veterinarians, veterinary technicians, and support staff, we are dedicated to delivering exceptional care while making the experience as stress-free as possible for both you and your pet.
    From routine check-ups to complex medical procedures, we handle every aspect of your pet's healthcare with the utmost professionalism and compassion. Our state-of-the-art facilities are equipped with the latest medical equipment and technologies, ensuring accurate diagnoses and effective treatment plans. We follow industry-leading standards and protocols to maintain a clean, safe, and comfortable environment for your pets.
    When you entrust your pet to our Pet Medical Administration service, you can expect a personalized approach tailored to your pet's specific needs. Our veterinarians take the time to understand your pet's medical history, behavior, and lifestyle, allowing them to provide individualized care and recommendations. Whether it's a preventive health assessment, vaccinations, dental care, or specialized treatments, we have you covered.
    In addition to medical care, our Pet Medical Administration service includes comprehensive record-keeping. We maintain detailed electronic health records for each pet, ensuring accurate and up-to-date information is readily available. This enables seamless coordination between our veterinary team and ensures continuity of care, even if you visit different branches or specialists within our network.
    Medication management is another essential aspect of our Pet Medical Administration service. Our experienced staff diligently tracks and administers prescribed medications, following precise dosage instructions and schedules. We understand the importance of consistency in medication delivery, and we take it upon ourselves to ensure your pet receives the necessary treatments in a timely manner.
    In summary, our Pet Medical Administration service at company offers a comprehensive range of veterinary services, from routine check-ups to advanced treatments, all delivered with the utmost professionalism and compassion. With our state-of-the-art facilities, experienced veterinary team, personalized approach, and emphasis on pet comfort, we are committed to providing the highest quality of care for your furry family members. Trust us to be your partner in ensuring the health and happiness of your pets."
);