'use client';

import Image from "next/image";
import "./PictureMenu.scss";
import { useRouter } from 'next/navigation';

import drone from "../../public/images/drone.png";
import droneBattery from "../../public/images/droneBattery.png";
import dronePropellers from "../../public/images/dronePropellers.png";
import droneCamera from "../../public/images/droneCamera.png";
import droneRemote from "../../public/images/droneRemote.png";
import droneElectronic from "../../public/images/droneElectronic.png";

const PictureMenu = () => {
  const router = useRouter();
  
  const handleCategoryClick = (category: string) => {
    router.push(`/fullList?category=${category}`);
  };

  const menuItems = [
    { label: "Drone", imageSrc: drone, className: "drones" },
    { label: "Batterie", imageSrc: droneBattery, className: "batteries" },
    { label: "Helices", imageSrc: dronePropellers, className: "helices" },
    { label: "Camera", imageSrc: droneCamera, className: "cameras" },
    { label: "Telecommande", imageSrc: droneRemote, className: "telecommandes" },
    { label: "Electronique", imageSrc: droneElectronic, className: "electronique" },
  ];

  return (
    <div className="menu">
      {menuItems.map((item, index) => (
        <div key={index} className={`menuItem ${item.className}`} onClick={() => handleCategoryClick(item.label)}>
          <Image src={item.imageSrc} alt={item.label} className="image" width={80} height={80} />
          <span className="label">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default PictureMenu;