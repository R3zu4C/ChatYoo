const Navbar = () => {
  const drawer = () => {
    console.log("button clicked");
  }

	return (
		<nav>
      <div className="flex items-center my-2 shadow-lg">
        <button className="mx-2" aria-label="Open Menu" onClick={drawer}>
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            className="w-8 h-8"
          >
            <path d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        <h2 className="text-3xl my-2 text-grey-400">ChatYoo</h2>
      </div>
		</nav>
	)
}

export default Navbar;