
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Contact } from '@/types/resume';
import { AtSign, Phone, MapPin, Linkedin, Globe, Github } from 'lucide-react';

interface ContactFormProps {
  contact: Contact;
  updateContact: (contact: Contact) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ contact, updateContact }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateContact({ ...contact, [name]: value });
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                value={contact.fullName}
                onChange={handleChange}
                placeholder="John Doe"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <AtSign className="h-4 w-4" /> Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={contact.email}
                onChange={handleChange}
                placeholder="john.doe@example.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> Phone
              </Label>
              <Input
                id="phone"
                name="phone"
                value={contact.phone}
                onChange={handleChange}
                placeholder="(123) 456-7890"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Location (Optional)
              </Label>
              <Input
                id="address"
                name="address"
                value={contact.address || ''}
                onChange={handleChange}
                placeholder="City, State"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="linkedin" className="flex items-center gap-2">
                <Linkedin className="h-4 w-4" /> LinkedIn (Optional)
              </Label>
              <Input
                id="linkedin"
                name="linkedin"
                value={contact.linkedin || ''}
                onChange={handleChange}
                placeholder="linkedin.com/in/johndoe"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="website" className="flex items-center gap-2">
                <Globe className="h-4 w-4" /> Website (Optional)
              </Label>
              <Input
                id="website"
                name="website"
                value={contact.website || ''}
                onChange={handleChange}
                placeholder="johndoe.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="github" className="flex items-center gap-2">
                <Github className="h-4 w-4" /> GitHub (Optional)
              </Label>
              <Input
                id="github"
                name="github"
                value={contact.github || ''}
                onChange={handleChange}
                placeholder="github.com/johndoe"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
