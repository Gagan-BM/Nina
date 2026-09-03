export type PrescriptionCategory = "Cute" | "Flirty" | "Funny" | "Sweet" | "Random";

export type Prescription = {
  id: number;
  category: PrescriptionCategory;
  message: string;
};

export const prescriptions: Prescription[] = [
  { id: 1, category: "Cute", message: "You're unnecessarily cute today. Please control yourself." },
  { id: 2, category: "Cute", message: "Just a reminder: someone out there thinks you're ridiculously adorable." },
  { id: 3, category: "Cute", message: "You have been officially diagnosed with being too cute." },
  { id: 4, category: "Flirty", message: "Prescription: one boyfriend. Recommended dosage: excessive attention." },
  { id: 5, category: "Flirty", message: "Warning: smiling like that may cause your boyfriend to fall for you again." },
  { id: 6, category: "Flirty", message: "I was going to write something smooth here, then I remembered you're prettier than my vocabulary." },
  { id: 7, category: "Funny", message: "Doctor's advice: drink water, relax, and stop pretending you don't want attention." },
  { id: 8, category: "Funny", message: "Your current level of cuteness has exceeded system limits." },
  { id: 9, category: "Funny", message: "Error 404: A valid reason for you being this cute was not found." },
  { id: 10, category: "Sweet", message: "You deserve a soft day, a warm hug, and absolutely zero unnecessary stress." },
  { id: 11, category: "Sweet", message: "Whatever kind of day you're having, I hope this makes it 1% better." },
  { id: 12, category: "Sweet", message: "Just wanted to remind you that you're special to me. That's it. No dramatic speech." },
  { id: 13, category: "Random", message: "Breaking news: local girl continues being adorable for absolutely no reason." },
  { id: 14, category: "Random", message: "Scientists remain confused about how you manage to be this cute." },
  { id: 15, category: "Random", message: "Your boyfriend's official report: still obsessed. Investigation ongoing." },
  { id: 16, category: "Funny", message: "Today's emotional forecast: 80% soft feelings with a chance of stealing my hoodie." },
  { id: 17, category: "Flirty", message: "Side effect notice: this app may cause sudden boyfriend texts and smug little smiles." },
  { id: 18, category: "Sweet", message: "For the record, you make ordinary days feel a little less ordinary." },
];
