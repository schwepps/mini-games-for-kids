import ProfileDemo from '@/components/ProfileDemo';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Guess Who Game
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Character Management System Demo
          </p>
        </div>
        
        <ProfileDemo />
      </div>
    </div>
  );
}
