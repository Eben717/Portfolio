import { projects, contacts, type Project, type InsertProject, type Contact, type InsertContact } from "@shared/schema";

export interface IStorage {
  // Projects
  getProjects(): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
  getProjectsByCategory(category: string): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;

  // Contacts
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
}

export class MemStorage implements IStorage {
  private projects: Map<number, Project>;
  private contacts: Map<number, Contact>;
  private currentProjectId: number;
  private currentContactId: number;

  constructor() {
    this.projects = new Map();
    this.contacts = new Map();
    this.currentProjectId = 1;
    this.currentContactId = 1;
    this.seedProjects();
  }

  private seedProjects() {
    const sampleProjects: InsertProject[] = [
      {
        title: "E-Commerce Dashboard",
        description: "A comprehensive dashboard for e-commerce management with real-time analytics, inventory tracking, and sales reporting.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        technologies: ["React", "Node.js", "MongoDB"],
        category: "web",
        liveUrl: "#",
        githubUrl: "#",
        featured: true,
      },
      {
        title: "TaskFlow Mobile App",
        description: "A productivity app for task management with team collaboration features, offline support, and intuitive drag-and-drop interface.",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        technologies: ["React Native", "Firebase", "Redux"],
        category: "mobile",
        liveUrl: "#",
        githubUrl: "#",
        featured: true,
      },
      {
        title: "Social Connect Platform",
        description: "A social networking platform with real-time messaging, content sharing, and advanced privacy controls for professional communities.",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        technologies: ["Vue.js", "Express", "PostgreSQL"],
        category: "web",
        liveUrl: "#",
        githubUrl: "#",
        featured: false,
      },
      {
        title: "Weather Analytics",
        description: "An advanced weather application with interactive maps, historical data analysis, and AI-powered predictions for agricultural planning.",
        image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        technologies: ["Angular", "Python", "AWS"],
        category: "web",
        liveUrl: "#",
        githubUrl: "#",
        featured: false,
      },
      {
        title: "Designer Portfolio",
        description: "A stunning portfolio website for a creative designer featuring smooth animations, interactive galleries, and optimized performance.",
        image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        technologies: ["Next.js", "GSAP", "Tailwind"],
        category: "frontend",
        liveUrl: "#",
        githubUrl: "#",
        featured: false,
      },
      {
        title: "FitTracker Pro",
        description: "A comprehensive fitness tracking application with workout planning, progress monitoring, and social features for motivation.",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        technologies: ["Flutter", "Django", "Redis"],
        category: "mobile",
        liveUrl: "#",
        githubUrl: "#",
        featured: false,
      },
    ];

    sampleProjects.forEach(project => {
      this.createProject(project);
    });
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(project => project.featured);
  }

  async getProjectsByCategory(category: string): Promise<Project[]> {
    if (category === "all") {
      return this.getProjects();
    }
    return Array.from(this.projects.values()).filter(project => project.category === category);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const project: Project = { ...insertProject, id };
    this.projects.set(id, project);
    return project;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const contact: Contact = { 
      ...insertContact, 
      id,
      createdAt: new Date()
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }
}

export const storage = new MemStorage();
