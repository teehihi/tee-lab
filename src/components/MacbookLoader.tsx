import React from 'react';

export function MacbookLoader() {
  return (
    <div className="macbook-loader-container">
      <div className="macbook">
        <div className="macbook__topBord">
          <div className="macbook__display">
            <div className="macbook__load" />
          </div>
        </div>
        <div className="macbook__underBord">
          <div className="macbook__keybord">
            <div className="keybord">
              <div className="keybord__touchbar" />
              <ul className="keybord__keyBox">
                <li className="keybord__key key--01" />
                <li className="keybord__key key--02" />
                <li className="keybord__key key--03" />
                <li className="keybord__key key--04" />
                <li className="keybord__key key--05" />
                <li className="keybord__key key--06" />
                <li className="keybord__key key--07" />
                <li className="keybord__key key--08" />
                <li className="keybord__key key--09" />
                <li className="keybord__key key--10" />
                <li className="keybord__key key--11" />
                <li className="keybord__key key--12" />
                <li className="keybord__key key--13" />
              </ul>
              <ul className="keybord__keyBox--under">
                <li className="keybord__key key--14" />
                <li className="keybord__key key--15" />
                <li className="keybord__key key--16" />
                <li className="keybord__key key--17" />
                <li className="keybord__key key--18" />
                <li className="keybord__key key--19" />
                <li className="keybord__key key--20" />
                <li className="keybord__key key--21" />
                <li className="keybord__key key--22" />
                <li className="keybord__key key--23" />
                <li className="keybord__key key--24" />
              </ul>
            </div>
          </div>
        </div>
      </div>
      <p className="macbook-loading-text">
        Loading...
      </p>
    </div>
  );
}
