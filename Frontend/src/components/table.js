const data1=[
    {name: 'Bought'}, {name: 'Registered'}, {name: 'Stored'},
    {name: 'Diagnosed'}, {name: 'Availability'}, {name: 'Options'}]
export default function HistoryTable() {
    return (
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-29 sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-red-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-2">
                <thead className="bg-blue-400">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
                    >
                      History
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
                    >
                      
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
                    >
                      Detail
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {data1.map((Data1) => (
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                            <div className="text-sm text-gray-500">{Data1.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">Date</div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Information</td>
                      
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }