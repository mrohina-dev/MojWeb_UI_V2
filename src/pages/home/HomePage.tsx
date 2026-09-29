import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download } from 'lucide-react';
import ModuleCard from '@/components/common/module-card';
import { Button } from '@/components/ui/button';
import { commonDownloadService } from '@/services/api/common-download-service';
import { HOME_MODULES, HOME_NOTICE } from './home.constants';
import { HomeNoticeBanner } from './components/home-notice-banner';
import type { SampleFileItem } from './home.types';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [downloadingEndpoint, setDownloadingEndpoint] = useState<string | null>(null);

  const handleDownloadSample = async (e: React.MouseEvent<HTMLButtonElement>, file: SampleFileItem) => {
    e.stopPropagation();

    try {
      setDownloadingEndpoint(file.endpoint);
      await commonDownloadService.downloadFromEndpoint(file.endpoint, {
        defaultFileName: file.defaultFileName,
      });
    } finally {
      setDownloadingEndpoint(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* بنر اطلاعیه و راهنما */}
      {HOME_NOTICE && (
        <HomeNoticeBanner
          title={HOME_NOTICE.title}
          description={HOME_NOTICE.description}
        />
      )}

      {/* شبکه کارت‌های ماژول */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {HOME_MODULES.map((module) => (
          <ModuleCard
            key={module.id}
            title={module.title}
            icon={module.icon}
            iconBgColor={module.iconBgColor}
            badge={module.badge}
            actionText={module.actionText}
            onClick={() => navigate(module.route)}
            description={
              <div className="mt-3 space-y-2 text-xs leading-relaxed">
                {/* فهرست توضیحات */}
                {module.descriptions.map((desc, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-muted-foreground">
                    <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
                    <span>{desc}</span>
                  </div>
                ))}

                {/* فهرست دانلود فایل‌ها */}
                {module.sampleFiles && module.sampleFiles.length > 0 && (
                  <div className="space-y-1.5 border-t border-border/40 pt-2.5">
                    {module.sampleFiles.map((file) => {
                      const isDownloading = downloadingEndpoint === file.endpoint;

                      return (
                        <div key={file.defaultFileName}>
                          <Button
                            variant="link"
                            size="sm"
                            loading={isDownloading}
                            iconStart={<Download className="h-3.5 w-3.5" />}
                            onClick={(e) => handleDownloadSample(e, file)}
                            className={`h-auto p-0 text-xs font-normal underline underline-offset-2 ${file.className ?? ''}`}
                          >
                            {file.title}
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
