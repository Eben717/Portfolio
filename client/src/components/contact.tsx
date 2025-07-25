import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Dribbble, Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { InsertContact } from "@shared/schema";

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  projectType: z.string().min(1, "Project type is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      reset();
      queryClient.invalidateQueries({ queryKey: ["/api/contacts"] });
    },
    onError: () => {
      toast({
        title: "Failed to send message",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "ebenezer@example.com",
      sublabel: "Email me directly",
    },
    {
      icon: Phone,
      label: "+1 (555) 123-4567",
      sublabel: "Call for urgent projects",
    },
    {
      icon: MapPin,
      label: "San Francisco, CA",
      sublabel: "Available for remote work",
    },
  ];

  const socialLinks = [
    { icon: Github, href: "#" },
    { icon: Linkedin, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Dribbble, href: "#" },
  ];

  return (
    <section id="contact" className="py-20 bg-white section-fade">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-secondary mb-4">Let's Work Together</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have a project in mind? I'd love to hear about it.
            Let's discuss how we can bring your ideas to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="contact-gradient rounded-2xl p-8 text-white mb-8">
              <h3 className="text-2xl font-semibold mb-6">Get In Touch</h3>

              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="font-medium">{info.label}</div>
                        <div className="text-blue-100">{info.sublabel}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 pt-8 border-t border-white/20">
                <div className="text-lg font-medium mb-4">Follow Me</div>
                <div className="flex space-x-4">
                  {socialLinks.map((link, index) => {
                    const IconComponent = link.icon;
                    return (
                      <a
                        key={index}
                        href={link.href}
                        className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                      >
                        <IconComponent className="h-5 w-5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <Card className="bg-slate-50 rounded-2xl border-0">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      {...register("firstName")}
                      placeholder="John"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    />
                    {errors.firstName && (
                      <p className="text-sm text-red-600 mt-1">{errors.firstName.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      {...register("lastName")}
                      placeholder="Doe"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    />
                    {errors.lastName && (
                      <p className="text-sm text-red-600 mt-1">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-2">
                    Project Type
                  </Label>
                  <Select onValueChange={(value) => setValue("projectType", value)}>
                    <SelectTrigger className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors">
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web">Web Application</SelectItem>
                      <SelectItem value="mobile">Mobile App</SelectItem>
                      <SelectItem value="ecommerce">E-commerce Site</SelectItem>
                      <SelectItem value="portfolio">Portfolio Website</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.projectType && (
                    <p className="text-sm text-red-600 mt-1">{errors.projectType.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    rows={5}
                    {...register("message")}
                    placeholder="Tell me about your project..."
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
                  />
                  {errors.message && (
                    <p className="text-sm text-red-600 mt-1">{errors.message.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={contactMutation.isPending}
                  className="w-full bg-primary text-white font-semibold py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
                >
                  {contactMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
