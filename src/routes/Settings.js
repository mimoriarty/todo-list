import React, { useContext } from'react';

import { ThemeContext } from '../App';

export default function Settings() {
  const {theme, setTheme} = useContext(ThemeContext);

  return (
    <div className='pt-3'>
      <h2>Settings</h2>
      <div>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="flexSwitchCheckDefault"
            checked={theme === "dark"}
            onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            />
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Dark</label>
        </div>
      </div>
    </div>
  );
}