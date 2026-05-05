import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BarLoader from "./BarLoader";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/login");
    }, 2200);
  }, [navigate]);

  return <BarLoader />;
}