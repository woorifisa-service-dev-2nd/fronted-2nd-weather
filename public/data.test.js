import { describe, expect, test } from 'vitest';
import { chooseClothByTem, bySkyStatus} from './data';

describe('chooseClothByTem call', () =>{
    test('case1: tem이 30일때 28도 이상에 해당된다', () => {
        const [text] = chooseClothByTem(30);
        expect(text).toContain('28℃ 이상');
      });

      test('case2: tem이 27일때 23~20에 포함이 되지 않는다.', () => {
        const [text] = chooseClothByTem(27);
        expect(text).not.toContain('22℃ ~ 20℃ 날씨입니다');
      });
})

describe('bySkyStatus call', () =>{
    test('case1: skyValue가 3일때 맑음인지', () => {
        const [sky,bg,status] = bySkyStatus(3);
        expect(status).toBe('맑음');
      });

      test('case2: skyValue가 7일때 흐림이 아닌지', () => {
        const [sky,bg,status] = bySkyStatus(7);
        expect(status).not.toBe('흐림');
      });

      test('case3: 정상적으로 작동할때 sky의 주소값이 jpg로 해당되는지', () => {
        const [sky,bg,status] = bySkyStatus(7);
        expect(sky).toContain('.jpg');
      });
      test('case3: skyValue가 11이상일때 흐림이 아닌지', () => {
        //const [sky,bg,status] = bySkyStatus(11);
        expect(() => bySkyStatus(11)).toThrow("에러");
      });
})
