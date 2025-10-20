import { Skeleton } from 'antd'
export default function WishlistProductSkeleton() {
  return (
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {" "}
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
        >
          {" "}
          <div className="relative p-4 bg-gray-100 dark:bg-gray-700">
            {" "}
            <div className="absolute top-2 right-2">
              {" "}
              <Skeleton.Button active size="small" shape="circle" />{" "}
            </div>{" "}
            <div className="absolute top-2 left-2">
              {" "}
              <Skeleton.Button active size="small" />{" "}
            </div>{" "}
            <div className="flex justify-center items-center h-full mt-8">
              {" "}
              <Skeleton.Image
                active
                className="!w-full !h-40 sm:!h-48 mb-4"
              />{" "}
            </div>{" "}
          </div>{" "}
          <div className="p-4">
            {" "}
            <Skeleton active paragraph={false} />{" "}
            <div className="flex items-center mt-2 mb-4">
              {" "}
              <Skeleton.Button active size="small" />{" "}
              <Skeleton.Button active size="small" />{" "}
            </div>{" "}
            <Skeleton.Button active block />{" "}
          </div>{" "}
        </div>
      ))}{" "}
    </div>
  )
}
