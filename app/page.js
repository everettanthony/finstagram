import Feed from '@/components/Feed';
import UploadModal from '@/components/UploadModal';

export default function Home() {

  return (
    <div className="py-16">
      <div className="container">
        <Feed />
        <UploadModal />
      </div>
    </div>
  )
}