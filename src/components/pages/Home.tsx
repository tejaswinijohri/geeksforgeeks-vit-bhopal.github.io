import { useRef, useState } from "react";
import { MdArrowForward, MdDone } from "react-icons/md";
import { FaDiscord, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

// Firebase
import { database } from "../../store";

// Components
import Primary from "../buttons/Primary";
import Secondary from "../buttons/Secondary";
import Navbar from "../Navbar";

const Header = () => {
  return (
    <header className="flex flex-col space-y-5 sm:items-center py-32 px-8 md:px-0">
      <div className="font-extrabold">
        <span className="text-primary text-4xl md:text-5xl leading-relaxed">
          GeeksforGeeks{" "}
        </span>
        <span className="text-secondary dark:text-white text-3xl md:text-5xl leading-relaxed">
          Student Chapter
        </span>
      </div>
      <div className="text-base font-medium text-gray-500 uppercase tracking-widest">
        Vellore Institute of Technology, Bhopal
      </div>
    </header>
  );
};

const EmailSection = () => {
  const [isSent, setIsSent] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputRef.current) {
      const email = inputRef.current.value;

      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (re.test(email.toLowerCase())) {
        database.ref("emails").push(email.toLowerCase());
        setIsSent(true);
      } else {
        inputRef.current.value = "";
        inputRef.current.placeholder = "Enter valid email";
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-14 space-y-8 bg-background-secondary-light dark:bg-background-secondary-dark shadow-sm">
      <div className="text:sm md:text-2xl font-extrabold text-secondary dark:text-white">
        Want to attend our upcoming event?
      </div>
      <form
        className="flex-col flex sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3"
        onSubmit={handleEmail}
      >
        {!isSent && (
          <input
            className="h-12 w-72 bg-secondary dark:bg-white text-white dark:text-black font-medium px-4 rounded border border-transparent focus:outline-none focus:ring-4 focus:ring-primary focus:border-transparent shadow-sm"
            placeholder="Enter your email"
            autoFocus={true}
            ref={inputRef}
          />
        )}
        <Primary type="submit" className="w-full">
          {isSent ? <MdDone fontSize={24} /> : <MdArrowForward fontSize={24} />}
          {isSent && <span>You will be notified</span>}
        </Primary>
      </form>
    </div>
  );
};

const TeamSection = () => {
  return (
    <div className="flex flex-col space-y-5 sm:items-center py-32 px-8 md:px-0 bg-background-primary-light dark:bg-background-primary-dark">
      <div className="font-extrabold">
        <span className="text-secondary dark:text-white text-3xl md:text-5xl leading-relaxed">
          Meet our team
        </span>
      </div>
      <div className="text-base font-medium text-gray-500 uppercase tracking-widest">
        People behind working hard to make this possible
      </div>
      <Link to="/team" className="py-4">
        <Primary>Team</Primary>
      </Link>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="flex flex-col space-y-5 sm:items-center py-32 px-8 md:px-0 bg-background-primary-light dark:bg-background-primary-dark">
      <div className="font-extrabold">
        <span className="text-secondary dark:text-white text-3xl md:text-5xl leading-relaxed">
          Connect with us
        </span>
      </div>
      <div className="text-base font-medium text-gray-500 uppercase tracking-widest">
        Never miss out anything what happens here
      </div>
      <div className="flex space-x-4 h-14 mt-12">
        <a href="https://github.com/GeeksforGeeks-VIT-Bhopal" target="_blank">
          <Secondary>
            <FaGithub fontSize={20} />
            <span className="hidden sm:block">Github</span>
          </Secondary>
        </a>
        <a href="https://discord.gg/Mb8B9HcyjT" target="_blank">
          <Secondary>
            <FaDiscord fontSize={20} />
            <span className="hidden sm:block">Discord</span>
          </Secondary>
        </a>
        <a href="https://www.instagram.com/geeksforgeeks_vitb/" target="_blank">
          <Secondary>
            <FaInstagram fontSize={20} />
            <span className="hidden sm:block">Instagram</span>
          </Secondary>
        </a>
        <a
          href="https://www.linkedin.com/company/geeksforgeeks-vitb/"
          target="_blank"
        >
          <Secondary>
            <FaLinkedin fontSize={20} />
            <span className="hidden sm:block">Linkedin</span>
          </Secondary>
        </a>
      </div>
    </footer>
  );
};

const Home: React.FC<{ handleTheme: () => void }> = ({ handleTheme }) => {
  return (
    <>
      <Navbar handleTheme={handleTheme} />
      <Header />
      <EmailSection />
      <TeamSection />
      <Footer />
    </>
  );
};

export default Home;
