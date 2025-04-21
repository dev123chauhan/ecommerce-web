// import React from 'react';
import PropTypes from 'prop-types';
import { Skeleton } from 'antd';

const ProductSkeleton = () => {
  return (
    <div className="flex-none w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-16px)]">
      <div className="p-4 rounded-lg shadow-lg">
        <div className="relative mb-4">
          <Skeleton.Image 
            active 
            className="w-full h-40 sm:h-48 object-contain rounded" 
          />
          <div className="absolute top-2 left-2">
            <Skeleton.Button 
              active 
              size="small" 
              shape="round" 
            />
          </div>
          <div className="absolute top-2 right-2">
            <Skeleton.Button 
              active 
              size="small" 
              shape="circle" 
            />
          </div>
        </div>
        
        <Skeleton 
          active 
          title={{ width: '100%' }} 
          paragraph={{ rows: 2, width: ['100%', '60%'] }} 
        />
        
        <div className="mt-4">
          <Skeleton.Button 
            active 
            block 
          />
        </div>
      </div>
    </div>
  );
};

const ProductGridSkeleton = ({ count }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {[...Array(count)].map((_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </div>
  );
};

// Add prop validation
ProductGridSkeleton.propTypes = {
  count: PropTypes.number
};

// Add default props
ProductGridSkeleton.defaultProps = {
  count: 8
};

export default ProductGridSkeleton;