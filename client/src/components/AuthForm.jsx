import React from 'react';

const AuthForm = ({ title, buttonText, toggleText, toggleAction, fields, onSubmit }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {title}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {toggleText} <a href="#" onClick={toggleAction} className="font-medium text-indigo-600 hover:text-indigo-500">
              {buttonText === 'Sign in' ? 'Create an account' : 'Sign in'}
            </a>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          {fields.map((field) => (
            <div key={field.id} className="space-y-1">
              <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">
                {field.label}
              </label>
              <input
                id={field.id}
                name={field.id}
                type={field.type}
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
          ))}

          <div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
