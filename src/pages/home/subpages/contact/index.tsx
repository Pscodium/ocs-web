/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function Contact() {
    const socialLinks = [
        {
            name: 'GitHub',
            icon: <FaGithub size={24} />,
            url: 'https://github.com/Pscodium',
            color: 'bg-gray-900 hover:bg-gray-700'
        },
        {
            name: 'LinkedIn',
            icon: <FaLinkedin size={24} />,
            url: 'https://linkedin.com/in/peterson-dev',
            color: 'bg-blue-600 hover:bg-blue-700'
        },
        {
            name: 'Email',
            icon: <FaEnvelope size={24} />,
            url: 'mailto:peter-larson@hotmail.com',
            color: 'bg-red-500 hover:bg-red-600'
        },
        // {
        //     name: 'WhatsApp',
        //     icon: <FaWhatsapp size={24} />,
        //     url: 'https://wa.me/[number]',
        //     color: 'bg-green-500 hover:bg-green-600'
        // }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="container mx-auto px-4 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-core-primary to-core-secondary bg-clip-text text-transparent mb-4">
                        Get In Touch
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        I'm always open to new opportunities and collaborations. Feel free to reach out if you want to work together or just say hi!
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Card className="shadow-xl">
                            <CardHeader>
                                <CardTitle>Send me a message</CardTitle>
                                <CardDescription>Fill out the form below and I'll get back to you as soon as possible.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Name</Label>
                                            <Input id="name" placeholder="John Doe" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input id="email" type="email" placeholder="john@example.com" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="subject">Subject</Label>
                                        <Input id="subject" placeholder="What's this about?" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="message">Message</Label>
                                        <Textarea id="message" placeholder="Your message here..." className="min-h-[150px]" />
                                    </div>
                                    <Button className="w-full bg-core-primary hover:bg-core-secondary">
                                        Send Message
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="space-y-6"
                    >
                        <Card className="shadow-xl">
                            <CardHeader>
                                <CardTitle>Contact Information</CardTitle>
                                <CardDescription>You can also reach me through these channels</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h3 className="font-semibold mb-2">Email</h3>
                                    <p className="text-gray-600">peterson@pscodium.dev</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2">Location</h3>
                                    <p className="text-gray-600">Joinville, Santa Catarina, Brazil</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2">Availability</h3>
                                    <p className="text-gray-600">Open for work</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="shadow-xl">
                            <CardHeader>
                                <CardTitle>Connect with me</CardTitle>
                                <CardDescription>Find me on social media</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {socialLinks.map((link, index) => (
                                        <motion.a
                                            key={link.name}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.3, delay: index * 0.1 }}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`flex items-center justify-center gap-2 p-3 rounded-lg text-white ${link.color} transition-all`}
                                        >
                                            {link.icon}
                                            <span className="hidden md:inline">{link.name}</span>
                                        </motion.a>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}