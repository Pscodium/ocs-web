import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { Card, CardContent } from '@/components/ui/card';

export default function Initial() {
    const skills = {
        languages: [
            { name: 'TypeScript', url: 'https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white' },
            { name: 'JavaScript', url: 'https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black' },
            { name: 'Node.js', url: 'https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white' },
            { name: 'Python', url: 'https://img.shields.io/badge/Python-14354C?style=for-the-badge&logo=python&logoColor=white' }
        ],
        frameworks: [
            { name: 'React', url: 'https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB' },
            { name: 'React Native', url: 'https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB' },
            { name: 'Express.js', url: 'https://img.shields.io/badge/Express.js-404D59?style=for-the-badge' },
            { name: 'Styled Components', url: 'https://img.shields.io/badge/styled--components-4ecc8b?style=for-the-badge&logo=styled-components&logoColor=white' },
            { name: 'React Router', url: 'https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white' }
        ],
        markup: [
            { name: 'HTML', url: 'https://img.shields.io/badge/HTML-ff8f17?style=for-the-badge&logo=html5&logoColor=white' },
            { name: 'CSS', url: 'https://img.shields.io/badge/CSS-7200fc?&style=for-the-badge&logo=css3&logoColor=white' }
        ],
        testing: [
            { name: 'Jest', url: 'https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white' },
            { name: 'Mocha', url: 'https://img.shields.io/badge/mocha.js-323330?style=for-the-badge&logo=mocha&logoColor=Brown' },
            { name: 'Chai', url: 'https://img.shields.io/badge/chai.js-323330?style=for-the-badge&logo=chai&logoColor=red' }
        ],
        databases: [
            { name: 'PostgreSQL', url: 'https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white' },
            { name: 'MySQL', url: 'https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white' },
            { name: 'MongoDB', url: 'https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white' }
        ]
    };

    const workHistory = [
        {
            company: "PagoNxt (Santander)",
            role: "Microservice Developer",
            start_date: "2024-09-01",
            end_date: "current",
            current: true,
            work_description: "Microsservices development."
        },
        {
            company: "Loopert",
            role: "Full-stack Developer",
            start_date: "2024-03-21",
            end_date: "2024-09-30",
            current: false,
            work_description: "Streaming services development."
        },
        {
            company: "Camerite",
            role: "Full-stack Developer",
            start_date: "2022-02-14",
            end_date: "2024-06-23",
            current: false,
            work_description: "Creating a mobile pwa application."
        },
        {
            company: "Imobo",
            role: "Backend Developer",
            start_date: "2021-12-20",
            end_date: "2022-04-20",
            current: false,
            work_description: "Code creation and maintenance."
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-core-primary to-core-secondary opacity-5"></div>
                <div className="container mx-auto px-4 py-20 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col md:flex-row items-center gap-12"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-core-primary to-core-secondary rounded-full blur-2xl opacity-20"></div>
                            <img
                                src="https://cdn.midjourney.com/cda590d8-eeb4-4997-a111-3c443c2c07ee/0_0.png"
                                alt="Peterson Larson"
                                className="w-64 h-64 rounded-full object-cover border-4 border-white shadow-2xl relative z-10"
                            />
                        </motion.div>

                        <div className="text-center md:text-left">
                            <motion.h1
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                                className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-core-primary to-core-secondary bg-clip-text text-transparent mb-4"
                            >
                                Peterson Larson
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                className="text-2xl text-gray-600 mb-6"
                            >
                                Typescript Developer
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.6 }}
                                className="flex justify-center md:justify-start gap-4"
                            >
                                <a href="https://github.com/Pscodium" target="_blank" rel="noopener noreferrer"
                                    className="p-3 rounded-full bg-gray-900 text-white hover:bg-gray-700 transition-all hover:scale-110">
                                    <FaGithub size={24} />
                                </a>
                                <a href="https://linkedin.com/in/peterson-dev" target="_blank" rel="noopener noreferrer"
                                    className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all hover:scale-110">
                                    <FaLinkedin size={24} />
                                </a>
                                <a href="mailto:peter-larson@hotmail.com"
                                    className="p-3 rounded-full bg-red-500 text-white hover:bg-red-600 transition-all hover:scale-110">
                                    <FaEnvelope size={24} />
                                </a>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="container mx-auto px-4 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">About Me</h2>
                    <Card className="max-w-4xl mx-auto shadow-xl">
                        <CardContent className="p-8">
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Hello, my name is Peterson, I'm 24 years old and I live in Brazil.
                                I have a great admiration for software development and I like to create applications
                                that somehow increase my technical knowledge. Now I'm looking for new job opportunities.
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
            </section>

            <section className="container mx-auto px-4 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Skills</h2>

                    <div className="max-w-6xl mx-auto space-y-8">
                        {Object.entries(skills).map(([category, items], categoryIndex) => (
                            <motion.div
                                key={category}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-lg shadow-lg p-6"
                            >
                                <h3 className="text-xl font-semibold mb-4 text-gray-700 capitalize">
                                    {category === 'testing' ? 'Unit Tests' : category === 'markup' ? 'Markup Languages' : category}
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {items.map((item, index) => (
                                        <motion.img
                                            key={item.name}
                                            src={item.url}
                                            alt={item.name}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.3, delay: index * 0.05 }}
                                            viewport={{ once: true }}
                                            className="h-10 rounded-md hover:scale-105 transition-transform"
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            <section className="container mx-auto px-4 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Work History</h2>

                    <div className="max-w-4xl mx-auto">
                        {workHistory.map((work, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="relative"
                            >
                                <div className="flex items-center mb-8">
                                    <div className="absolute left-0 w-full h-0.5 bg-gray-200"></div>
                                    <div className="relative z-10 bg-white">
                                        <div className="w-4 h-4 bg-core-primary rounded-full"></div>
                                    </div>
                                </div>

                                <Card className="mb-8 shadow-lg hover:shadow-xl transition-shadow">
                                    <CardContent className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-800">{work.role}</h3>
                                                <p className="text-lg text-core-primary">{work.company}</p>
                                            </div>
                                            {work.current && (
                                                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                                    Current
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-gray-600 mb-2">
                                            {work.start_date} - {work.end_date}
                                        </p>
                                        <p className="text-gray-700">{work.work_description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Code Block Section
            <section className="container mx-auto px-4 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <Card className="bg-black text-white shadow-xl overflow-hidden">
                        <CardContent className="p-0">
                            <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex items-center gap-2">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span className="ml-4 text-sm text-gray-400">Work.ts</span>
                            </div>
                            <pre className="p-6 overflow-x-auto h-[200px]">
                                {`const technologies = {
    languages: ['JavaScript', 'TypeScript', 'Python'],
    frameworks: ['React', 'Node.js', 'Express'],
    databases: ['PostgreSQL', 'MongoDB'],
    testing: ['Jest', 'Mocha', 'Chai']
};`};
                            </pre>
                        </CardContent>
                    </Card>
                </motion.div>
            </section> */}
        </div>
    );
}