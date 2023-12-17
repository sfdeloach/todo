function TopNav({ currentUser, handlePageNavigation }) {
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
      }}>
      <div
        style={{ fontSize: '2rem' }}
        onClick={() => handlePageNavigation('todo-list')}
        onMouseEnter={e => {
          if (currentUser.loggedIn) {
            e.target.style.color = '#888';
            e.target.style.cursor = 'pointer';
          }
        }}
        onMouseLeave={e => {
          if (currentUser.loggedIn) {
            e.target.style.color = '#000';
            e.target.style.cursor = 'default';
          }
        }}>
        <span className='material-symbols-outlined'>checklist</span> my todo
      </div>
      <div
        style={{
          display: 'flex',
          gap: '1rem'
        }}>
        <div
          style={currentUser.role_id === 0 ? {} : { visibility: 'hidden' }}
          onClick={() => handlePageNavigation('user-list')}
          onMouseEnter={e => {
            e.target.style.color = '#888';
            e.target.style.cursor = 'pointer';
          }}
          onMouseLeave={e => (e.target.style.color = '#000')}>
          Users
        </div>
        <div
          style={{ display: currentUser.loggedIn ? 'block' : 'none' }}
          onClick={() => handlePageNavigation('logout')}
          onMouseEnter={e => {
            e.target.style.color = '#888';
            e.target.style.cursor = 'pointer';
          }}
          onMouseLeave={e => (e.target.style.color = '#000')}>
          Logout
        </div>
      </div>
    </div>
  );
}

export default TopNav;
