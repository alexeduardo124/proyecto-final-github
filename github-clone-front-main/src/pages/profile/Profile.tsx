import { Link, useParams } from "react-router-dom";
import { Header } from "../../components/ui";
import "./ProfilePage.css";
import { useRequest } from "../../hooks/useFetch";
import { Repository } from "../../interfaces";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const { username } = useParams();
  const { apiRequest } = useRequest();
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const { apiData } = await apiRequest(null, `https://github-clone-api-p0bi.onrender.com/api/repository/${username}`, "get");
      setRepositories(apiData.data.folders);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (!isLoading) {
    console.log(repositories);
  }

  const handleDelete = async (repoName: string) => {
    const data = {
      name: repoName,
      userId: username,
    };

    try {
      const { apiData } = await apiRequest(data, "https://github-clone-api-p0bi.onrender.com/api/repository/", "delete");
      console.log("apiData", apiData);
      setRepositories(repositories.filter((repo) => repo.name !== repoName));
    } catch (error) {
      console.error("Error al eliminar el repositorio:", error);
    }
  };

  return isLoading ? (
    <div className="min-h-screen flex justify-center items-center">
      <p className="text-gray-700 text-2xl">Loading...</p>
    </div>
  ) : (
    <div className="bg-white text-black min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8 flex">
        <section className="w-full space-y-5">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Your Repositories</h3>
            <div className="">
              <Link to={`/${username}/new`}>
                <button className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  New Repository
                </button>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {repositories.map((repo: Repository) => (
              <div
                key={repo.name}
                className="relative border border-gray-300 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <button
                  className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                  onClick={() => handleDelete(repo.name)}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H3a1 1 0 100 2h14a1 1 0 100-2h-2V3a1 1 0 00-1-1H6zm2 4a1 1 0 011 1v7a1 1 0 11-2 0V7a1 1 0 011-1zm4 0a1 1 0 011 1v7a1 1 0 11-2 0V7a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <a href="#" onClick={() => {}}>
                  {repo.name}
                </a>
                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <span className="flex items-center text-gray-700 text-sm">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 3a1 1 0 011-1h10a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V3z"></path>
                    </svg>
                    {repo.files.length} files
                  </span>
                  <span className="flex items-center text-gray-700 text-sm"></span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProfilePage;
