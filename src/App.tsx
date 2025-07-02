import ContentsPage from "@/components/ContentsPage";
import { CLOSET_CONNECT_LOGO } from "@/image-constants";

function App() {
  return (
    <div className="flex flex-col relative">
      <div
        id="header"
        className="flex items-center justify-between p-4 fixed w-full top-0 bg-black border-b border-[#1a1a1f]"
      >
        <a href="/">
          <img
            src={CLOSET_CONNECT_LOGO}
            alt="Closet Connect Logo"
            className="logo"
          />
        </a>
        <button className="py-2 px-4 rounded-md text-black bg-[#b2f7ff] font-medium text-sm">
          REQUIRED FEATURE
        </button>
      </div>
      <ContentsPage />
      <div
        id="footer"
        className="p-2 bg-black flex w-full fixed bottom-0 text-xs font-medium"
      >
        <div className="mx-4">TERMS</div>
        <div className="mx-4">PRIVACY</div>
        <div className="mx-4">CONTACT</div>
      </div>
    </div>
  );
}

export default App;
