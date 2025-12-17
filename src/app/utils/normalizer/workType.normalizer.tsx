import { WorkType, WorkTypeI18n } from '@/types/api/workType.type';
import { normalizeTranslations } from './translation.normalizer';

export const normalizeWorkTypes = (
  workTypes: WorkType[],
  className: string,
) => {
  return (
    <div className={`${className}-container`}>
      {workTypes?.map((workType: WorkType, index: number) => (
        <div
          key={`${className}-${workType.id}`}
          className={`${className}-content`}
        >
          {normalizeTranslations<WorkTypeI18n>(workType.i18n).map((i18n) => (
            <div
              key={`${className}-${workType.id}-${i18n.locale.id}`}
              className={`${className}-label`}
            >
              <p>{i18n.label}</p>
              {index < workTypes.length - 1 && <span>|</span>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
