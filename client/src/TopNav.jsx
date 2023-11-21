function TopNav({ currentUser, logout }) {
  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0rem 2rem',
        marginBottom: '2rem',
        backgroundColor: '#eee',
        height: '3rem'
      }}
    >
      <div style={{ fontSize: '2rem' }}>
        <span className='material-symbols-outlined'>checklist</span> my todo
      </div>
      <div
        style={{ display: currentUser.loggedIn ? 'block' : 'none' }}
        onClick={logout}
        onMouseEnter={e => {
          e.target.style.color = '#888';
          e.target.style.cursor = 'pointer';
        }}
        onMouseLeave={e => (e.target.style.color = '#000')}
      >
        Logout
      </div>
    </div>
  );
}

export default TopNav;
