import type { Folder } from '../types';

interface FolderListProps {
  folders: Folder[];
  currentFolder: string;
  onFolderChange: (folder: string) => void;
}

export function FolderList({ folders, currentFolder, onFolderChange }: FolderListProps) {
  return (
    <div className="bg-white border border-[#CCCCCC] mb-4">
      {folders.map((folder) => {
        const Icon = folder.icon;
        return (
          <button
            key={folder.id}
            onClick={() => onFolderChange(folder.id)}
            className={`w-full text-left p-2 font-['Arial'] text-sm flex items-center gap-2 border-b border-[#CCCCCC] last:border-b-0 hover:bg-[#F5F5F5] ${
              currentFolder === folder.id ? 'bg-[#E5E5E5]' : ''
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{folder.name}</span>
            {folder.count > 0 && (
              <span className="ml-auto text-xs bg-[#003366] text-white px-2 rounded">
                {folder.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}