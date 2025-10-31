import React from "react";
interface CustomerCardProps {
  name: string;
  email: string;
  segment: "Bireysel" | "Kobi" | "Kurumsal";
  transactions: number;
}

const segmentColors = {
  Bireysel: "bg-blue-100 text-blue-800",
  KOBİ: "bg-red-100 text-red-800",
  Kurumsal: "bg-green-100 text-green-800",
};

const CustomerCard: React.FC<CustomerCardProps> = ({
  name,
  email,
  segment,
  transactions,
}) => {
  return (
    <div>
      <div></div>
    </div>
  );
};

export default CustomerCard;
