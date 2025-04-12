function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className=" mx-auto text-center flex justify-center">
        <p>&copy; {new Date().getFullYear()} My Website. All rights reserved.</p>
        <p>
          <a href="/privacy-policy" className="text-gray-400 hover:text-white">
            Privacy Policy
            Robel looks like saka
          </a>
        </p>
      </div>
    </footer>
  );
}
export default Footer;