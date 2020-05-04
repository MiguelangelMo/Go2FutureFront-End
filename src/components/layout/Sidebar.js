import React from 'react';
import FormNewProject from '../proyecto/FormNewProject';
import List from '../proyecto/List';

const Sidebar = () => {
    return (
        <aside>
            <h1>
                Go2<span>Future </span>
            </h1>

            <FormNewProject />

            <div className="proyectos">
                <h2> Actividades </h2>
                <List />
            </div>
        </aside>
    );
}

export default Sidebar;