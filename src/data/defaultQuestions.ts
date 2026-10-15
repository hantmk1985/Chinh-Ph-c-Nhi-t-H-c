import { Question } from '../types/game';

export const DEFAULT_QUESTIONS: Question[] = [
  {
    id: 'kntt-12-01',
    topic: 'Cấu trúc của chất',
    difficulty: 'Nhận biết',
    question: 'Theo mô hình động học phân tử, các phân tử cấu tạo nên chất khí có đặc điểm nào sau đây?',
    options: [
      'Ở rất gần nhau và dao động xung quanh vị trí cân bằng cố định.',
      'Ở xa nhau, lực tương tác rất yếu và chuyển động hỗn loạn không ngừng.',
      'Có trật tự tầm xa và chỉ chuyển động khi bị đốt nóng.',
      'Luôn đứng yên và chỉ chuyển động khi có ngoại lực tác dụng.'
    ],
    correctAnswer: 1,
    explanation: 'Theo thuyết động học phân tử, ở thể khí các phân tử ở xa nhau, khoảng cách giữa các phân tử lớn gấp nhiều lần kích thước phân tử, lực tương tác phân tử rất yếu nên chuyển động hỗn loạn hỗn loạn (hỗn độn) không ngừng về mọi phía.'
  },
  {
    id: 'kntt-12-02',
    topic: 'Sự chuyển thể',
    difficulty: 'Nhận biết',
    question: 'Hiện tượng chất chuyển trực tiếp từ thể rắn sang thể khí mà không qua thể lỏng gọi là gì?',
    options: [
      'Sự nóng chảy',
      'Sự đông đặc',
      'Sự thăng hoa',
      'Sự ngưng kết'
    ],
    correctAnswer: 2,
    explanation: 'Sự thăng hoa là quá trình chuyển thể trực tiếp từ thể rắn sang thể khí (hơi) mà không qua thể lỏng (ví dụ: băng khô - CO2 rắn, viên long não/băng phiến).'
  },
  {
    id: 'kntt-12-03',
    topic: 'Nội năng',
    difficulty: 'Thông hiểu',
    question: 'Nội năng của một vật trong nhiệt động lực học là:',
    options: [
      'Tổng động năng và thế năng trọng trường của toàn bộ vật.',
      'Tổng động năng chuyển động nhiệt và thế năng tương tác của các phân tử cấu tạo nên vật.',
      'Nhiệt lượng mà vật thu vào khi được đun nóng.',
      'Năng lượng cơ học mà vật có được khi chuyển động với vận tốc cao.'
    ],
    correctAnswer: 1,
    explanation: 'Trong nhiệt động lực học, nội năng (kí hiệu là U) của một vật là tổng động năng chuyển động nhiệt của các phân tử và thế năng tương tác giữa các phân tử cấu tạo nên vật đó (U = Wđ + Wt).'
  },
  {
    id: 'kntt-12-04',
    topic: 'Biến đổi nội năng',
    difficulty: 'Nhận biết',
    question: 'Có hai cách làm thay đổi nội năng của một vật là:',
    options: [
      'Thực hiện công và truyền nhiệt.',
      'Đốt nóng và làm lạnh.',
      'Cọ xát và nghiền nát.',
      'Nén thể tích và dãn thể tích.'
    ],
    correctAnswer: 0,
    explanation: 'Có hai hình thức cơ bản làm thay đổi nội năng của một vật là: thực hiện công (có sự chuyển hoá từ dạng năng lượng khác sang nội năng) và truyền nhiệt (không có sự chuyển hoá năng lượng mà chỉ có sự truyền nội năng).'
  },
  {
    id: 'kntt-12-05',
    topic: 'Định luật I NĐTĐH',
    difficulty: 'Thông hiểu',
    question: 'Hệ thức của Định luật I nhiệt động lực học là ΔU = A + Q. Quy ước dấu nào sau đây là ĐÚNG?',
    options: [
      'Q > 0: hệ toả nhiệt lượng; A > 0: hệ thực hiện công.',
      'Q < 0: hệ nhận nhiệt lượng; A < 0: hệ nhận công.',
      'Q > 0: hệ nhận nhiệt lượng; A > 0: hệ nhận công.',
      'Q > 0: hệ nhận nhiệt lượng; A > 0: hệ thực hiện công.'
    ],
    correctAnswer: 2,
    explanation: 'Theo quy ước dấu quốc tế trong SGK Vật lí 12 KNTT: Khi hệ nhận năng lượng thì dấu dương (Q > 0: nhận nhiệt lượng; A > 0: nhận công); khi hệ truyền năng lượng cho vật khác thì dấu âm (Q < 0: toả nhiệt lượng; A < 0: thực hiện công).'
  },
  {
    id: 'kntt-12-06',
    topic: 'Định luật I NĐTĐH',
    difficulty: 'Vận dụng',
    question: 'Người ta truyền cho khí trong xi lanh một nhiệt lượng 120 J. Khí nở ra và thực hiện một công 70 J đẩy pít-tông lên. Độ biến thiên nội năng ΔU của khí là:',
    options: [
      '190 J',
      '50 J',
      '-50 J',
      '-190 J'
    ],
    correctAnswer: 1,
    explanation: 'Khí nhận nhiệt lượng nên Q = +120 J. Khí sinh công đẩy pít-tông nên A = -70 J. Áp dụng định luật I: ΔU = A + Q = -70 + 120 = +50 J. Nội năng của khí tăng 50 J.'
  },
  {
    id: 'kntt-12-07',
    topic: 'Thang nhiệt độ',
    difficulty: 'Nhận biết',
    question: 'Nhiệt độ "Không độ tuyệt đối" (0 K) trong thang nhiệt độ Kelvin tương ứng với bao nhiêu độ trong thang nhiệt độ Celsius?',
    options: [
      '-273,15 °C',
      '0 °C',
      '100 °C',
      '-100 °C'
    ],
    correctAnswer: 0,
    explanation: 'Công thức chuyển đổi giữa hai thang đo là T(K) = t(°C) + 273,15. Do đó khi T = 0 K thì t = 0 - 273,15 = -273,15 °C. Đây là nhiệt độ thấp nhất trên lý thuyết mà vật chất có thể đạt được.'
  },
  {
    id: 'kntt-12-08',
    topic: 'Thang nhiệt độ',
    difficulty: 'Thông hiểu',
    question: 'Khi nhiệt độ của một chất lỏng tăng thêm 15 °C thì trong thang Kelvin, nhiệt độ của nó tăng thêm bao nhiêu Kelvin?',
    options: [
      '288,15 K',
      '258,15 K',
      '15 K',
      '30 K'
    ],
    correctAnswer: 2,
    explanation: 'Vì mỗi độ chia (1 K) trong thang Kelvin có độ lớn bằng đúng mỗi độ chia (1 °C) trong thang Celsius (ΔT = Δt), nên khi nhiệt độ tăng thêm 15 °C thì nhiệt độ trong thang Kelvin cũng tăng thêm đúng 15 K.'
  },
  {
    id: 'kntt-12-09',
    topic: 'Thang nhiệt độ',
    difficulty: 'Vận dụng',
    question: 'Ở nhiệt độ nào thì số chỉ trên nhiệt kế Celsius (°C) và nhiệt kế Fahrenheit (°F) có cùng một giá trị số?',
    options: [
      '0°',
      '-40°',
      '100°',
      '-273°'
    ],
    correctAnswer: 1,
    explanation: 'Công thức liên hệ: t(°F) = 1,8.t(°C) + 32. Cho t(°F) = t(°C) = x, ta có phương trình: x = 1,8x + 32 ⇔ -0,8x = 32 ⇔ x = -40°. Vậy ở -40 °C tương đương đúng -40 °F.'
  },
  {
    id: 'kntt-12-10',
    topic: 'Nhiệt dung riêng',
    difficulty: 'Nhận biết',
    question: 'Đơn vị đo nhiệt dung riêng (c) trong hệ đơn vị SI là:',
    options: [
      'J/kg',
      'J/(kg.K)',
      'J/K',
      'kJ/mol'
    ],
    correctAnswer: 1,
    explanation: 'Từ công thức nhiệt lượng Q = m.c.Δt, ta suy ra c = Q / (m.Δt). Do đó đơn vị của c trong hệ SI là Jun trên kilôgam Kenvin: J/(kg.K) hoặc J/(kg.°C).'
  },
  {
    id: 'kntt-12-11',
    topic: 'Nhiệt dung riêng',
    difficulty: 'Thông hiểu',
    question: 'Nước có nhiệt dung riêng rất lớn (khoảng 4180 J/(kg.K)). Ý nghĩa thực tế quan trọng nhất của tính chất này là gì?',
    options: [
      'Làm cho nước đóng băng rất nhanh vào mùa đông.',
      'Giúp các đại dương hấp thụ và tỏa nhiệt lượng lớn, đóng vai trò điều hòa khí hậu toàn cầu.',
      'Khiến cho việc đun sôi nước tốn ít năng lượng nhất trong các chất lỏng.',
      'Làm cho nước dễ bay hơi ở nhiệt độ thấp.'
    ],
    correctAnswer: 1,
    explanation: 'Nhờ nhiệt dung riêng lớn, lượng nước khổng lồ ở sông hồ, đại dương hấp thụ nhiều nhiệt khi trời nóng mà nhiệt độ tăng ít, và tỏa ra nhiều nhiệt khi trời lạnh mà nhiệt độ giảm chậm, tạo nên cơ chế điều hòa khí hậu tuyệt vời cho Trái Đất.'
  },
  {
    id: 'kntt-12-12',
    topic: 'Nhiệt dung riêng',
    difficulty: 'Vận dụng',
    question: 'Cần cung cấp một nhiệt lượng bao nhiêu để đun nóng 2 kg nước (nhiệt dung riêng c = 4200 J/(kg.K)) từ 25 °C lên đến 85 °C?',
    options: [
      '504 kJ',
      '252 kJ',
      '714 kJ',
      '126 kJ'
    ],
    correctAnswer: 0,
    explanation: 'Độ biến thiên nhiệt độ: Δt = 85 - 25 = 60 °C (hoặc 60 K). Áp dụng công thức: Q = m.c.Δt = 2 × 4200 × 60 = 504 000 J = 504 kJ.'
  },
  {
    id: 'kntt-12-13',
    topic: 'Nhiệt nóng chảy riêng',
    difficulty: 'Nhận biết',
    question: 'Đại lượng nhiệt nóng chảy riêng λ của một chất có ý nghĩa là:',
    options: [
      'Nhiệt lượng cần để làm nóng 1 kg chất đó tăng thêm 1 °C.',
      'Nhiệt lượng cần cung cấp để 1 kg chất đó nóng chảy hoàn toàn ở nhiệt độ nóng chảy.',
      'Nhiệt lượng tỏa ra khi toàn bộ vật thể bị hóa hơi.',
      'Nhiệt lượng cần để nung chảy một khối chất rắn bất kì.'
    ],
    correctAnswer: 1,
    explanation: 'Nhiệt nóng chảy riêng λ của một chất là nhiệt lượng cần cung cấp để làm nóng chảy hoàn toàn 1 kg chất đó ở nhiệt độ nóng chảy. Công thức: Q = λ.m (đơn vị của λ là J/kg).'
  },
  {
    id: 'kntt-12-14',
    topic: 'Nhiệt nóng chảy riêng',
    difficulty: 'Vận dụng',
    question: 'Nhiệt nóng chảy riêng của nước đá là λ = 3,34.10⁵ J/kg. Nhiệt lượng cần cung cấp để làm nóng chảy hoàn toàn 500 g nước đá ở 0 °C là:',
    options: [
      '1,67.10⁵ J',
      '3,34.10⁵ J',
      '6,68.10⁵ J',
      '1,67.10⁸ J'
    ],
    correctAnswer: 0,
    explanation: 'Đổi m = 500 g = 0,5 kg. Nhiệt lượng nóng chảy: Q = λ.m = 3,34.10⁵ × 0,5 = 1,67.10⁵ J (tức 167 kJ).'
  },
  {
    id: 'kntt-12-15',
    topic: 'Sự chuyển thể',
    difficulty: 'Thông hiểu',
    question: 'Trong suốt quá trình nóng chảy của một khối chất rắn kết tinh tinh khiết (ví dụ nước đá nguyên chất), nhiệt độ của khối chất sẽ biến đổi như thế nào?',
    options: [
      'Liên tục tăng đều đặn.',
      'Liên tục giảm xuống.',
      'Không đổi cho đến khi chất rắn nóng chảy hoàn toàn.',
      'Ban đầu tăng nhanh sau đó giảm chậm.'
    ],
    correctAnswer: 2,
    explanation: 'Chất rắn kết tinh có nhiệt độ nóng chảy xác định. Trong suốt quá trình nóng chảy, nhiệt lượng cung cấp được sử dụng để phá vỡ cấu trúc mạng tinh thể (tăng thế năng phân tử) chứ không làm tăng động năng trung bình phân tử, nên nhiệt độ của chất không đổi.'
  },
  {
    id: 'kntt-12-16',
    topic: 'Nhiệt hóa hơi riêng',
    difficulty: 'Nhận biết',
    question: 'Công thức tính nhiệt lượng cần cung cấp để làm hóa hơi hoàn toàn khối lượng m của một chất lỏng ở nhiệt độ sôi là:',
    options: [
      'Q = m.c.Δt',
      'Q = λ.m',
      'Q = L.m',
      'Q = A + ΔU'
    ],
    correctAnswer: 2,
    explanation: 'Nhiệt lượng cần cung cấp để một khối lượng m chất lỏng hóa hơi hoàn toàn ở nhiệt độ sôi là Q = L.m, trong đó L là nhiệt hóa hơi riêng của chất lỏng (đơn vị J/kg).'
  },
  {
    id: 'kntt-12-17',
    topic: 'Nhiệt hóa hơi riêng',
    difficulty: 'Thông hiểu',
    question: 'Vì sao đối với cùng 1 kg nước ở nhiệt độ tương ứng, nhiệt hóa hơi riêng (L ≈ 2,26.10⁶ J/kg) lại lớn hơn rất nhiều so với nhiệt nóng chảy riêng (λ ≈ 3,34.10⁵ J/kg)?',
    options: [
      'Vì khi hóa hơi, các phân tử nước cần rất ít năng lượng để chuyển động.',
      'Vì khi hóa hơi, cần năng lượng rất lớn để bẻ gãy hoàn toàn liên kết giữa các phân tử và thực hiện công thắng áp suất ngoài dãn nở thể tích.',
      'Vì khi nóng chảy thể tích của nước tăng lên hàng nghìn lần.',
      'Vì nhiệt kế đo ở nhiệt độ sôi nhạy hơn ở nhiệt độ nóng chảy.'
    ],
    correctAnswer: 1,
    explanation: 'Khi nóng chảy, liên kết tinh thể chỉ bị nới lỏng một phần. Nhưng khi hóa hơi, các phân tử phải tách rời hoàn toàn khỏi lực hút của các phân tử khác để trở thành chất khí, đồng thời thể tích tăng lên hàng nghìn lần phải sinh công thắng áp suất bên ngoài. Do đó L lớn gấp gần 7 lần λ.'
  },
  {
    id: 'kntt-12-18',
    topic: 'Ứng dụng thực tế',
    difficulty: 'Thông hiểu',
    question: 'Khi bị sốt cao, người ta thường dùng khăn ướt ấm đắp lên trán hoặc lau người. Biện pháp này dựa trên hiện tượng vật lí nào?',
    options: [
      'Sự ngưng tụ tỏa nhiệt làm ấm cơ thể.',
      'Sự bay hơi của nước thu nhiệt lượng từ trán, giúp hạ nhiệt độ cơ thể an toàn.',
      'Sự đông đặc của mồ hôi ngăn ngừa mất nhiệt.',
      'Sự dãn nở nhiệt của các mạch máu.'
    ],
    correctAnswer: 1,
    explanation: 'Nước trên khăn ướt bay hơi. Quá trình bay hơi thu một lượng nhiệt hóa hơi rất lớn từ bề mặt da và trán của người bệnh, giúp truyền bớt nhiệt lượng dư thừa ra ngoài và hạ sốt hiệu quả.'
  },
  {
    id: 'kntt-12-19',
    topic: 'Vận dụng tổng hợp',
    difficulty: 'Vận dụng',
    question: 'Một ấm điện công suất 1000 W được dùng để đun 100 g nước đang sôi ở 100 °C hóa hơi hoàn toàn. Biết nhiệt hóa hơi riêng của nước là L = 2,26.10⁶ J/kg và bỏ qua mọi hao phí nhiệt. Thời gian đun là:',
    options: [
      '22,6 giây',
      '226 giây',
      '2260 giây',
      '45,2 giây'
    ],
    correctAnswer: 1,
    explanation: 'Nhiệt lượng cần để hóa hơi 100 g (0,1 kg) nước sôi: Q = L.m = 2,26.10⁶ × 0,1 = 226 000 J. Vì hiệu suất 100% nên Q = P.t ⇒ t = Q / P = 226 000 / 1000 = 226 giây (khoảng 3 phút 46 giây).'
  },
  {
    id: 'kntt-12-20',
    topic: 'Vận dụng cao',
    difficulty: 'Vận dụng cao',
    question: 'Thả một cục nước đá có khối lượng 100 g ở 0 °C vào một cốc chứa 400 g nước ở 40 °C. Bỏ qua nhiệt dung của cốc và sự trao đổi nhiệt với môi trường. Cho c_nước = 4200 J/(kg.K), λ_đá = 3,36.10⁵ J/kg. Sau khi cân bằng nhiệt, trạng thái trong cốc là:',
    options: [
      'Nước đá chưa tan hết, nhiệt độ của cốc là 0 °C.',
      'Nước đá tan hết hoàn toàn, nhiệt độ cân bằng xấp xỉ 16 °C.',
      'Nước đá tan hết hoàn toàn, nhiệt độ cân bằng là 20 °C.',
      'Nước đá tan một nửa, nhiệt độ cốc là 10 °C.'
    ],
    correctAnswer: 1,
    explanation: 'Nhiệt lượng cần để 100 g đá nóng chảy hết ở 0°C: Q1 = λ.m_đá = 3,36.10⁵ × 0,1 = 33 600 J. Nhiệt lượng 400 g nước tỏa ra khi hạ từ 40°C xuống 0°C: Q_tỏa_max = 0,4 × 4200 × 40 = 67 200 J. Vì Q_tỏa_max > Q1 nên đá tan hết hoàn toàn và nhiệt độ cân bằng t_cb > 0°C. Phương trình cân bằng nhiệt: Q1 + m_đá.c.t_cb = m_nước.c.(40 - t_cb) ⇔ 33600 + 0,1×4200×t_cb = 0,4×4200×(40 - t_cb) ⇔ 33600 + 420.t_cb = 67200 - 1680.t_cb ⇔ 2100.t_cb = 33600 ⇔ t_cb = 16 °C.'
  }
];

export const TOPIC_LIST = [
  'Tất cả chủ đề',
  'Cấu trúc của chất',
  'Sự chuyển thể',
  'Nội năng',
  'Biến đổi nội năng',
  'Định luật I NĐTĐH',
  'Thang nhiệt độ',
  'Nhiệt dung riêng',
  'Nhiệt nóng chảy riêng',
  'Nhiệt hóa hơi riêng',
  'Ứng dụng thực tế',
  'Vận dụng tổng hợp',
  'Vận dụng cao'
];
