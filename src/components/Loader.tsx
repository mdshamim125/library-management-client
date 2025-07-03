// src/components/shared/Loader.tsx
import { ScaleLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-[60vh]">
      <ScaleLoader color="#2563eb" height={40} />
    </div>
  );
};

export default Loader;
