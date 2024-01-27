import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div>
      <h2>About iNotebook</h2>
      <p>
        iNotebook is a simple note-taking application designed to help you
        organize your thoughts, ideas, tasks, and more. With iNotebook, you can
        easily create, edit, and delete notes, ensuring that you never forget
        important information again.
      </p>
      <h3>Features:</h3>
      <ul>
        <li>Create new notes</li>
        <li>Edit existing notes</li>
        <li>Delete unwanted notes</li>
      </ul>
      <h3>Account Management:</h3>
      <p>
        To access additional features and save your notes securely, please log
        in or sign up for an account.
      </p>
      <div>
        <Link to="/login">Login</Link>
        <span> | </span>
        <Link to="/signup">Sign Up</Link>
      </div>
      <h3>Contact Us:</h3>
      <p>
        If you have any questions, suggestions, or feedback, please feel free
        to contact us at support@inotebook.com. We'd love to hear from you!
      </p>
      <h3>Acknowledgments:</h3>
      <p>
        We would like to thank our users for their continued support and
        feedback, which helps us improve iNotebook and make it even better.
      </p>
    </div>
  );
};

export default About;
