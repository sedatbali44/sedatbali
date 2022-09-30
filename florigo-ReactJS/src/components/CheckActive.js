import clsx from 'clsx';

const CheckActive = ({ status }) => (
  <div>
    <span
      className={clsx(
        'inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 rounded-full bg-red-600',
        status === 1 && 'bg-green-600'
      )}
    >
      {status === 1 ? 'Active' : 'Passive'}
    </span>
  </div>
);

export default CheckActive;
