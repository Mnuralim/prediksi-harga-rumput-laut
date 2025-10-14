import { getAllSeaweeds } from "@/actions/seaweed";
import { SeaWeedList } from "./_components/list";

interface Props {
  searchParams: Promise<{
    limit?: string;
    skip?: string;
    startDate?: string;
    endDate?: string;
    sortBy?: string;
    sortOrder?: string;
    message?: string;
    alertType?: "success" | "error";
  }>;
}

export default async function SeaweedPage({ searchParams }: Props) {
  const {
    endDate,
    skip,
    sortBy,
    sortOrder,
    startDate,
    limit,
    alertType,
    message,
  } = await searchParams;

  const [result] = await Promise.all([
    getAllSeaweeds(
      limit || "10",
      skip || "0",
      sortBy || "date",
      startDate,
      endDate,
      sortOrder
    ),
  ]);

  return (
    <main className="w-full px-4 sm:px-6 lg:px-8 py-8 min-h-screen bg-slate-50">
      <div className="bg-white border border-slate-200 shadow-sm rounded-lg">
        <div className="px-6 py-6 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-xl font-semibold text-slate-900">
                Seaweed Management
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                Kelola data penjualan rumput laut
              </p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <SeaWeedList
            seaWeeds={result.seaweeds}
            pagination={{
              currentPage: result.currentPage,
              totalPages: result.totalPages,
              totalItems: result.totalCount,
              itemsPerPage: result.itemsPerPage,
              preserveParams: {
                limit,
                skip,
                startDate,
                endDate,
                sortBy,
                sortOrder,
                message,
                alertType,
              },
            }}
          />
        </div>
      </div>
    </main>
  );
}
