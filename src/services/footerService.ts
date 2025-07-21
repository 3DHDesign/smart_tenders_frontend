import axiosInstance from "./axiosInstance";

export interface FooterData {
  about: string; // <- map from `description` or `title`
  address: string;
  phone: string;
  email: string;
  facebook: string;
  linkedin: string;
  companyName: string;
  year: string;
}

export const getFooterDetails = async (): Promise<FooterData> => {
  const response = await axiosInstance.get("/details");
  const contact = response.data.data.contact_details[0];

  return {
    about: contact.description, // or use contact.title
    address: contact.address,
    phone: contact.phone1,
    email: contact.email,
    facebook: contact.facebook,
    linkedin: contact.linkedin,
    companyName: contact.name, // Assuming 'name' is company name
    year: new Date().getFullYear().toString(),
  };
};
