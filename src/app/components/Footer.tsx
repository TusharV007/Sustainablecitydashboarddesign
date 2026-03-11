export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">About</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Sustainable City Rankings provides data-driven environmental impact assessments to
              help build a greener future.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Environmental Data Sources</li>
              <li>Climate Action Guidelines</li>
              <li>Urban Planning Best Practices</li>
              <li>Sustainability Research</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Contact</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              For inquiries about methodology, data partnerships, or feedback, please reach out to
              our research team.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-sm text-gray-500">
          <p>© 2026 Sustainable City Rankings. Built with data-driven insights for a sustainable future.</p>
        </div>
      </div>
    </footer>
  );
}
