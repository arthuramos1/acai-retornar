import Header from "../components/Header";
import Main from "../components/Main";
import AboutMe from "../components/AboutMe";
import Experience from "../components/Experience";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
	return (
		<>
			<Header />
			<Main />
			<AboutMe />
			<Experience />
			<Contact />
			<Footer />
		</>
	);
}