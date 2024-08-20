import React, { useState } from "react";
import { Header, Icons } from "../components/ui";
import { useParams } from "react-router-dom";
import axios from "axios";

const CreateRepository = () => {
  const [repoName, setRepoName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const { username } = useParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      data: {
        name: repoName,
        userId: username,
      },
    };

    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));

      console.log(files);

      if (Array.isArray(files) && files.length > 0) {
        files.forEach((file) => {
          formData.append("files", file);
        });
      } else {
        console.log("No files selected");
        // Puedes manejar este caso según tus necesidades
      }

      const response = await axios.post("https://github-clone-api-p0bi.onrender.com/api/repository", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error al crear el repositorio:", error);
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white text-gray-900 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Create a new repository</h1>
          <p className="mb-8 text-gray-600">
            A repository contains all project files, including the revision history. Already have a project repository
            elsewhere?
            <a href="#" className="text-blue-600 hover:underline ml-1">
              Import a repository.
            </a>
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="repo-name" className="block text-sm font-medium mb-2">
                Repository name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="repo-name"
                className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={repoName}
                onChange={(e) => setRepoName(e.target.value)}
                required
              />
              <p className="mt-2 text-sm text-gray-600">
                Great repository names are short and memorable. Need inspiration? How about
                <span className="text-blue-600 ml-1">refactored-octo-bassoon</span>?
              </p>
            </div>

            <div>
              <label htmlFor="file-upload" className="block text-sm font-medium mb-2">
                Upload file
              </label>
              <input
                type="file"
                id="file-upload"
                className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                multiple
                onChange={handleFileChange}
              />
            </div>

            <div className="pt-5">
              <button
                type="submit"
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                disabled={isLoading}
              >
                {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateRepository;
