(() => {
  'use strict';

  const COPY = {
    vi: {
      skip: 'Đến nội dung chính',
      backLink: '← Các bản đề xuất',
      proposalContext: 'SON / XƯỞNG SƠN MÀI ĐƯƠNG ĐẠI · CONCEPT ĐỘC LẬP',
      wordmarkSub: 'SƠN TA & KHÔNG GIAN · HÀ NỘI',
      navStrata: '01 / Bàn mài nước',
      navWorks: '02 / Hiện vật',
      navNotes: '03 / Buồng ủ',
      navPlaque: '04 / Bảng mẫu',
      shortlistBtn: 'Sổ mẫu đã lưu',
      heroEyebrow: 'NGHIÊN CỨU VẬT LIỆU · HẠ THÁI & HÀ NỘI',
      heroTitleLine1: 'Mười hai lớp sơn.',
      heroTitleLine2: 'Ánh sáng nằm ở dưới cùng.',
      heroLead:
        'Sơn mài Việt Nam không vẽ lên bề mặt. Người thợ chôn vàng quỳ, vỏ trứng và chu sa dưới nhiều tầng sơn then, rồi dùng đá suối cùng nước mưa mài ngược xuống để gọi ánh sáng thức dậy.',
      strataRailLabel: 'CẤU TRÚC 05 TẦNG SƠN',
      stratum0Title: 'Vóc gỗ & Đất phù sa',
      stratum0Sub: 'Lớp cốt bó vải màn · 0–18 ngày',
      stratum1Title: 'Sơn then đen thẳm',
      stratum1Sub: 'Nhựa sơn Phú Thọ & tùng hương · 24 ngày',
      stratum2Title: 'Vỏ trứng & Vàng quỳ',
      stratum2Sub: 'Khảm thủ công từng mảnh · 42 ngày',
      stratum3Title: 'Sơn son chu sa',
      stratum3Sub: 'Phủ kín các tầng khảm · 68 ngày',
      stratum4Title: 'Mài nước & Bóng tay',
      stratum4Sub: 'Cánh gián trong suốt · 90 ngày',
      canvasHint: 'Chạm và xoa trên bề mặt để mài nước qua các tầng sơn',
      autoPolishBtn: 'Mài mẫu tự động',
      resetCoatBtn: 'Phủ lại lớp sơn',
      depthLabel: 'MẶT CẮT ĐỘ SÂU',
      lightAngleLabel: 'Góc rọi sáng',
      specMaterialLabel: 'Nguyên liệu',
      specHumidityLabel: 'Điều kiện buồng ủ',
      specToolLabel: 'Dụng cụ chế tác',
      seeObjectsCta: 'Xem 04 hiện vật hoàn thiện',
      archiveEyebrow: '01 / TƯ LIỆU HIỆN VẬT · BỘ SƯU TẬP 2026',
      archiveTitle: 'Những hình khối giữ bóng tối.',
      archiveIntro:
        'Bốn thiết kế đầu tiên từ xưởng SON. Tối giản về hình học để nhường toàn bộ chiều sâu cho bề mặt sơn mài tự nhiên. Mở từng hồ sơ để xem cấu trúc lớp sơn và lưu vào sổ mẫu.',
      filterAll: 'Tất cả',
      filterFurniture: 'Nội thất',
      filterObject: 'Vật dụng',
      filterArch: 'Bình phong',
      viewGallery: 'Trưng bày',
      viewList: 'Mục lục',
      inspectArtifact: 'Hồ sơ hiện vật +',
      tableCure: '14 lớp · 95 ngày',
      tableTitle: 'Bàn Trà Tĩnh Mặc',
      tableSummary:
        'Khối gỗ tần bì bọc vải màn, mười bốn lớp sơn then mài phẳng như mặt nước đêm, điểm dải vỏ trứng rạn nơi mép vát.',
      vesselCure: '12 lớp · 80 ngày',
      vesselTitle: 'Bình Âm Chu Sa',
      vesselSummary:
        'Sắc đỏ chu sa mài lộ lớp sơn cánh gián và bụi vàng quỳ nơi vai bình, tạo cảm giác ngọn lửa âm ỉ dưới lớp nước sâu.',
      screenCure: '16 lớp · 110 ngày',
      screenTitle: 'Bình Phong Sương Sớm',
      screenSummary:
        'Ba tấm bình phong nối bằng bản lề đồng thau ẩn. Mật độ vỏ trứng và bạc quỳ dày dần về phía chân như sương sớm mặt hồ.',
      trayCure: '11 lớp · 74 ngày',
      trayTitle: 'Khay Trà Khảm Ốc',
      traySummary:
        'Bề mặt sơn then mài đá suối giữ độ mờ nhung, nổi bật những đường chỉ vỏ trai ánh xanh lục cắt mảnh chưa tới một phần mười milimét.',
      notebookKicker: '02 / GHI CHÉP XƯỞNG · NGHỊCH LÝ CỦA SƠN TA',
      notebookTitle: 'Sơn chỉ khô khi ở trong bóng tối và hơi nước.',
      notebookLead:
        'Khác với sơn công nghiệp bay hơi ngoài nắng, nhựa cây sơn vùng đồi Phú Thọ cần độ ẩm trên 80% và bóng tối tĩnh lặng của buồng ủ để kết mạng phân tử thành lớp men vĩnh cửu.',
      phase1Days: 'NGÀY 01–18',
      phase1Title: 'Hom vóc & Bó vải',
      phase1Desc:
        'Cốt gỗ được bọc vải màn trộn đất phù sa sông Hồng đã nung và nhựa sơn sống, tạo lớp vỏ chịu nhiệt và chống nứt qua hàng chục năm.',
      phase2Days: 'NGÀY 19–52',
      phase2Title: 'Chôn sắc & Ủ ẩm',
      phase2Desc:
        'Vỏ trứng, vàng quỳ, bạc lá và ốc xà cừ được gắn thủ công rồi phủ kín dưới nhiều lượt sơn then và sơn son. Mỗi lớp nghỉ ba ngày trong buồng ủ treo vải ướt.',
      phase3Days: 'NGÀY 53–90',
      phase3Title: 'Mài nước & Đánh bóng',
      phase3Desc:
        'Người thợ dùng đá mài nhám cùng nước sạch xoa đều cho tới khi các tầng khảm dần hiện ra, cuối cùng xoa phấn đá và đánh bóng bằng chính lòng bàn tay.',
      provTitle: 'Nguồn nguyên liệu bản địa',
      provCopy:
        'Nhựa sơn ta Tam Nông (Phú Thọ) · Vàng quỳ Kiêu Kỵ (Gia Lâm) · Ốc xà cừ Chuyên Mỹ · Xưởng chế tác tại Hạ Thái, Thường Tín, Hà Nội.',
      notebookCta: 'Thử phối tấm mẫu của riêng bạn',
      composerEyebrow: '03 / BẢNG MẪU VẬT LIỆU · DÀNH CHO KIẾN TRÚC SƯ & NGƯỜI SƯU TẦM',
      composerTitle: 'Phối một tấm mẫu sơn ta.',
      composerIntro:
        'Trước khi thực hiện một mặt bàn hay vách bình phong, xưởng luôn làm trước một tấm mẫu 18 × 12 cm. Chọn sắc nền, kỹ thuật khảm và độ sâu vết mài để xem trước và lưu thông số kỹ thuật.',
      metricLayersLabel: 'TỔNG SỐ LỚP SƠN',
      metricCureLabel: 'THỜI GIAN Ủ & MÀI',
      metricSheenLabel: 'ĐỘ PHẢN XẠ ÁNH SÁNG',
      stepBaseLabel: 'Sắc nền chủ đạo (Base Coat)',
      baseThen: 'Sơn Then',
      baseThenSub: 'Đen thẳm truyền thống',
      baseSon: 'Sơn Son',
      baseSonSub: 'Đỏ chu sa trầm',
      baseAmber: 'Cánh Gián',
      baseAmberSub: 'Nâu hổ phách trong',
      baseMoss: 'Men Rêu',
      baseMossSub: 'Lục trầm cổ độ',
      stepInlayLabel: 'Lớp khảm chìm (Buried Inlay)',
      inlayEgg: 'Vỏ trứng rạn',
      inlayEggSub: 'Mảng sáng ngà tự nhiên',
      inlayGold: 'Vàng quỳ 24K',
      inlayGoldSub: 'Bụi vàng chìm dưới sơn',
      inlayPearl: 'Khảm trai xanh',
      inlayPearlSub: 'Chỉ ốc xà cừ ánh ngũ sắc',
      inlayPure: 'Sơn trơn mộc',
      inlayPureSub: 'Chỉ giữ chiều sâu nhựa sơn',
      stepFinishLabel: 'Độ hoàn thiện bề mặt (Surface Honing)',
      finishMirror: 'Đánh bóng lòng bàn tay',
      finishMirrorSub: 'Mặt gương sâu, phản chiếu ánh sáng phòng',
      finishMatte: 'Mài đá suối mờ',
      finishMatteSub: 'Mờ nhung tĩnh lặng, không chói sáng',
      stepRevealLabel: 'Độ sâu vết mài lộ vân',
      savePlaqueBtn: 'Lưu tấm mẫu vào sổ',
      exportPlaqueBtn: 'Tải phiếu mẫu PNG',
      footerTagline: 'Xưởng sơn mài & vật dụng đương đại · Hà Nội, Việt Nam.',
      creditsLink: 'Nguồn tư liệu & thiết kế',
      footerDisclaimer:
        'SON là một dự án concept độc lập do Lucas Nguyen thiết kế và lập trình nhằm trình diễn nghệ thuật chỉ đạo hình ảnh và tương tác web. Mọi thông số và sổ mẫu chỉ lưu trên trình duyệt của bạn.',
      backToHidden: 'Tất cả bản đề xuất tại /hidden/ →',
      closeBtn: 'Đóng',
      dialogDimLabel: 'Kích thước',
      dialogCoreLabel: 'Cốt vóc',
      dialogStrataLabel: 'Các tầng sơn',
      dialogTimeLabel: 'Thời gian hoàn thiện',
      shortlistTopbar: 'SỔ MẪU & YÊU CẦU TƯ VẤN',
      shortlistTitle: 'Sổ mẫu của bạn.',
      shortlistSub: 'Những hiện vật và tấm mẫu sơn ta bạn đã lưu trong phiên xem này.',
      inquiryNoteLabel: 'Bản nháp yêu cầu gửi xưởng (tự động tổng hợp)',
      copyNoteBtn: 'Sao chép nội dung',
      clearShortlistBtn: 'Xóa tất cả',
      shortlistDisclaimer:
        'Đây là bản mô phỏng tương tác. Không có thông tin hay đơn đặt hàng nào được gửi đi khỏi trình duyệt của bạn.'
    },
    en: {
      skip: 'Skip to main content',
      backLink: '← Hidden showcases',
      proposalContext: 'SON / CONTEMPORARY LACQUER ATELIER · INDEPENDENT CONCEPT',
      wordmarkSub: 'NATURAL LACQUER & OBJECTS · HANOI',
      navStrata: '01 / Water-Sanding Bench',
      navWorks: '02 / Selected Works',
      navNotes: '03 / Curing Room',
      navPlaque: '04 / Sample Composer',
      shortlistBtn: 'Saved Samples',
      heroEyebrow: 'MATERIAL STUDY · HẠ THÁI & HANOI',
      heroTitleLine1: 'Twelve layers of resin.',
      heroTitleLine2: 'The light waits at the bottom.',
      heroLead:
        'Vietnamese sơn mài is never painted on the surface. Artisans bury gold leaf, crushed duck eggshell, and cinnabar beneath nocturnal black resin, then sand downward with stream stone and rainwater to wake the light.',
      strataRailLabel: '05 LACQUER STRATA',
      stratum0Title: 'Timber & Alluvial Clay',
      stratum0Sub: 'Linen-wrapped core · Days 0–18',
      stratum1Title: 'Nocturnal Sơn Then',
      stratum1Sub: 'Phú Thọ resin & pine rosin · Day 24',
      stratum2Title: 'Eggshell & Gold Leaf',
      stratum2Sub: 'Hand-laid mosaic inlay · Day 42',
      stratum3Title: 'Cinnabar Vermilion',
      stratum3Sub: 'Sealing the buried inlay · Day 68',
      stratum4Title: 'Water-Honed Mirror',
      stratum4Sub: 'Translucent amber glaze · Day 90',
      canvasHint: 'Drag across the plaque to wet-sand through the lacquer strata',
      autoPolishBtn: 'Auto-Polish Reveal',
      resetCoatBtn: 'Recoat Surface',
      depthLabel: 'CROSS-SECTION DEPTH',
      lightAngleLabel: 'Grazing Light',
      specMaterialLabel: 'Raw Material',
      specHumidityLabel: 'Curing Chamber',
      specToolLabel: 'Craft Tools',
      seeObjectsCta: 'Explore 04 completed works',
      archiveEyebrow: '01 / ARCHIVE DOSSIER · 2026 COLLECTION',
      archiveTitle: 'Forms that hold the dark.',
      archiveIntro:
        'Four inaugural pieces from the SON atelier. Architectural silhouettes pared back so the multi-layered natural lacquer carries the entire visual weight. Open any dossier to inspect its strata.',
      filterAll: 'All works',
      filterFurniture: 'Furniture',
      filterObject: 'Vessels & Trays',
      filterArch: 'Screens',
      viewGallery: 'Exhibition',
      viewList: 'Index',
      inspectArtifact: 'Object Dossier +',
      tableCure: '14 layers · 95 days',
      tableTitle: 'Tĩnh Mặc Low Table',
      tableSummary:
        'Linen-bound ash core under fourteen coats of nocturnal sơn then polished like still night water, interrupted by a chamfered band of cracked duck eggshell and gold leaf.',
      vesselCure: '12 layers · 80 days',
      vesselTitle: 'Chu Sa Acoustic Vessel',
      vesselSummary:
        'Deep cinnabar vermilion water-sanded along the shoulder to expose burnt amber and 24K gold dust beneath, like embers under dark water.',
      screenCure: '16 layers · 110 days',
      screenTitle: 'Sương Sớm Folding Screen',
      screenSummary:
        'Three architectural panels joined by concealed brass hinges. Crushed eggshell and silver leaf gather toward the floor like morning mist.',
      trayCure: '11 layers · 74 days',
      trayTitle: 'Chuyên Mỹ Inlay Tea Tray',
      traySummary:
        'River-stone honed matte black lacquer inlaid with razor-thin iridescent mother-of-pearl geometry cut to a tenth of a millimeter.',
      notebookKicker: '02 / ATELIER NOTES · THE PARADOX OF SƠN TA',
      notebookTitle: 'Lacquer cures only in darkness and monsoon humidity.',
      notebookLead:
        'Unlike industrial coatings that dry by evaporation in sun, raw Rhus succedanea sap from Phú Thọ polymerizes only inside a dark chamber kept above 80% humidity.',
      phase1Days: 'DAYS 01–18',
      phase1Title: 'Core Binding & Clay',
      phase1Desc:
        'Seasoned timber is wrapped in fine gauze steeped in roasted Red River alluvial clay and raw lacquer sap, forming an armor impervious to seasonal warping.',
      phase2Days: 'DAYS 19–52',
      phase2Title: 'Burying Light & Curing',
      phase2Desc:
        'Crushed eggshell, 24K Kiêu Kỵ gold leaf, and mother-of-pearl are inlaid by hand and sealed beneath alternating coats of black and vermilion resin.',
      phase3Days: 'DAYS 53–90',
      phase3Title: 'Water-Sanding & Palm Polish',
      phase3Desc:
        'Artisans rub the surface under running water with fine whetstone until buried strata surface, finishing with fossil powder and bare-palm polishing.',
      provTitle: 'Regional Material Provenance',
      provCopy:
        'Tam Nông lacquer sap (Phú Thọ) · Kiêu Kỵ 24K gold leaf (Gia Lâm) · Chuyên Mỹ mother-of-pearl · Crafted in Hạ Thái, Hanoi.',
      notebookCta: 'Compose your own custom lacquer plaque',
      composerEyebrow: '03 / MATERIAL SAMPLE STUDIO · FOR ARCHITECTS & COLLECTORS',
      composerTitle: 'Compose a bespoke lacquer plaque.',
      composerIntro:
        'Before commissioning a table or architectural screen, our atelier prepares an 18 × 12 cm sample board. Select base coat, buried inlay, and sanding depth to preview and download a spec sheet.',
      metricLayersLabel: 'TOTAL LACQUER COATS',
      metricCureLabel: 'CURING & HONING TIME',
      metricSheenLabel: 'SPECULAR REFLECTANCE',
      stepBaseLabel: 'Primary Ground (Base Coat)',
      baseThen: 'Sơn Then',
      baseThenSub: 'Nocturnal iron-black resin',
      baseSon: 'Sơn Son',
      baseSonSub: 'Deep cinnabar vermilion',
      baseAmber: 'Cánh Gián',
      baseAmberSub: 'Translucent burnt amber',
      baseMoss: 'Men Rêu',
      baseMossSub: 'Deep antique moss umber',
      stepInlayLabel: 'Buried Inlay Stratum',
      inlayEgg: 'Cracked Eggshell',
      inlayEggSub: 'Hand-tapped warm ivory mosaic',
      inlayGold: '24K Gold Leaf',
      inlayGoldSub: 'Submerged gold leaf clouds',
      inlayPearl: 'Mother-of-Pearl',
      inlayPearlSub: 'Iridescent shell linework',
      inlayPure: 'Pure Uninlaid',
      inlayPureSub: 'Uninterrupted resin depth',
      stepFinishLabel: 'Surface Honing',
      finishMirror: 'Palm-Polished Mirror',
      finishMirrorSub: 'Deep liquid reflection (88 GU)',
      finishMatte: 'Water-Stone Matte',
      finishMatteSub: 'Quiet velvety stone sheen (18 GU)',
      stepRevealLabel: 'Water-Sanding Reveal Depth',
      savePlaqueBtn: 'Save Plaque to Shortlist',
      exportPlaqueBtn: 'Download Spec PNG',
      footerTagline: 'Contemporary lacquerware & architectural objects · Hanoi, Vietnam.',
      creditsLink: 'Provenance & Credits',
      footerDisclaimer:
        'SON is a self-initiated design and creative-engineering showcase by Lucas Nguyen. All selections and custom sample boards remain locally in your browser.',
      backToHidden: 'All hidden showcases at /hidden/ →',
      closeBtn: 'Close',
      dialogDimLabel: 'Dimensions',
      dialogCoreLabel: 'Core Structure',
      dialogStrataLabel: 'Lacquer Strata',
      dialogTimeLabel: 'Curing Duration',
      shortlistTopbar: 'SAMPLE SHORTLIST & INQUIRY DRAFT',
      shortlistTitle: 'Your Atelier Shortlist.',
      shortlistSub: 'Completed works and custom sample plaques saved during this session.',
      inquiryNoteLabel: 'Auto-generated atelier specification note',
      copyNoteBtn: 'Copy Specification',
      clearShortlistBtn: 'Clear All',
      shortlistDisclaimer:
        'Interactive concept preview. No orders or messages are transmitted from your device.'
    }
  };

  const STRATA_DATA = [
    {
      code: { vi: 'TẦNG 01 / CỐT VÓC', en: 'STRATUM 01 / FOUNDATION CORE' },
      badge: { vi: '18 NGÀY ĐẦU', en: 'DAYS 01–18' },
      title: { vi: 'Vóc gỗ & Đất phù sa', en: 'Timber & Alluvial Clay' },
      desc: {
        vi: 'Mọi tác phẩm sơn mài bắt đầu từ lớp cốt. Gỗ tần bì hoặc gỗ mít được bọc vải màn xô, hom cùng đất phù sa sông Hồng trộn nhựa sơn sống rồi mài phẳng bằng đá nhám.',
        en: 'Every piece begins in darkness. Seasoned timber is wrapped in fine cotton gauze, sealed with roasted Red River alluvial clay kneaded into raw lacquer sap, and stone-leveled.'
      },
      material: { vi: 'Gỗ tần bì, vải màn, đất phù sa nung', en: 'Ash timber, cotton gauze, roasted alluvial clay' },
      humidity: { vi: 'Độ ẩm 80% · Nhiệt độ 26°C', en: '80% RH · 26°C dark chamber' },
      tool: { vi: 'Bay sừng trâu, đá mài thô', en: 'Buffalo-horn spatula, coarse whetstone' },
      depthUm: 145,
      polishTarget: 0.92
    },
    {
      code: { vi: 'TẦNG 02 / SƠN NỀN', en: 'STRATUM 02 / NOCTURNAL GROUND' },
      badge: { vi: '24 NGÀY Ủ', en: 'DAY 24 CURING' },
      title: { vi: 'Sơn then đen thẳm', en: 'Nocturnal Sơn Then' },
      desc: {
        vi: 'Nhựa sơn Phú Thọ được đánh thủ công trong chậu gỗ cùng tùng hương và phèn sắt suốt nhiều giờ cho tới khi chuyển sang sắc đen thẳm có chiều sâu như đáy nước đêm.',
        en: 'Raw Phú Thọ sap is churned for hours with pine rosin and iron sulfate in a wooden vessel until it oxidizes into a nocturnal black deeper than any synthetic pigment.'
      },
      material: { vi: 'Nhựa sơn ta Tam Nông & phèn sắt', en: 'Tam Nông lacquer sap & iron sulfate' },
      humidity: { vi: 'Độ ẩm 85% · Nhiệt độ 28°C', en: '85% RH · 28°C humid chamber' },
      tool: { vi: 'Bút lông đuôi bò, bàn quay gỗ', en: 'Ox-hair flat brush, wooden lathe' },
      depthUm: 95,
      polishTarget: 0.72
    },
    {
      code: { vi: 'TẦNG 03 / KHẢM CHÌM', en: 'STRATUM 03 / BURIED INLAY' },
      badge: { vi: '42 NGÀY Ủ', en: 'DAY 42 INLAY' },
      title: { vi: 'Vỏ trứng & Vàng quỳ', en: 'Eggshell & Gold Leaf' },
      desc: {
        vi: 'Vỏ trứng vịt nướng sơ được đặt ngửa hay úp tùy độ sáng trầm, gõ nhẹ bằng đầu búa nhỏ để tạo mạng vết rạn tự nhiên. Bụi vàng quỳ Kiêu Kỵ mỏng hơn làn khói được rắc lên nền sơn còn ướt.',
        en: 'Lightly toasted duck eggshells are pressed into wet lacquer and tapped with a miniature hammer to fracture into organic islands, surrounded by hand-beaten 24K Kiêu Kỵ gold leaf.'
      },
      material: { vi: 'Vỏ trứng vịt Cỏ & vàng 24K đập tay', en: 'Toasted duck eggshell & 24K gold leaf' },
      humidity: { vi: 'Độ ẩm 85% · Nhiệt độ 28°C', en: '85% RH · 28°C humid chamber' },
      tool: { vi: 'Dao xương trâu, búa gõ rạn, đá mài bùn', en: 'Bone stylus, cracking hammer, mud stone' },
      depthUm: 48,
      polishTarget: 0.42
    },
    {
      code: { vi: 'TẦNG 04 / SƠN PHỦ', en: 'STRATUM 04 / VERMILION SEAL' },
      badge: { vi: '68 NGÀY Ủ', en: 'DAY 68 SEALING' },
      title: { vi: 'Sơn son chu sa', en: 'Cinnabar Vermilion' },
      desc: {
        vi: 'Nhiều lượt sơn son pha khoáng chu sa được phủ chồng lên trên, chôn toàn bộ lớp vỏ trứng và vàng quỳ vào trong bóng tối. Bề mặt lúc này chỉ còn một sắc đỏ trầm dày đặc.',
        en: 'Successive coats of cinnabar-pigmented vermilion lacquer submerge the eggshell and gold leaf completely. At this stage the buried light is invisible beneath the red surface.'
      },
      material: { vi: 'Sơn quang dầu trẩu & khoáng chu sa', en: 'Tung-oil refined resin & cinnabar mineral' },
      humidity: { vi: 'Độ ẩm 82% · Nhiệt độ 27°C', en: '82% RH · 27°C dark curing room' },
      tool: { vi: 'Chổi sơn lông mịn, tủ ủ kín gió', en: 'Fine hair brush, draft-free curing cabinet' },
      depthUm: 18,
      polishTarget: 0.14
    },
    {
      code: { vi: 'TẦNG 05 / HOÀN THIỆN', en: 'STRATUM 05 / WATER HONING' },
      badge: { vi: '90 NGÀY HOÀN TẤT', en: 'DAY 90 FINISH' },
      title: { vi: 'Mài nước & Bóng tay', en: 'Water-Honed Mirror' },
      desc: {
        vi: 'Dưới làn nước mát, đá mài mịn lấy đi từng phần nghìn milimét sơn phủ để vàng quỳ, vỏ trứng và sơn son cùng hiện lên trên một mặt phẳng duy nhất, phủ lớp cánh gián trong suốt.',
        en: 'Under cool running water, fine whetstone grinds away micron by micron until vermilion, gold leaf, and eggshell occupy a single glass-smooth plane veiled in translucent amber.'
      },
      material: { vi: 'Sơn cánh gián trong, phấn đá & nước mưa', en: 'Translucent amber resin, Tripoli stone powder' },
      humidity: { vi: 'Đánh bóng bằng lòng bàn tay người thợ', en: 'Bare-palm friction polishing & charcoal' },
      tool: { vi: 'Đá mài suối, than gỗ xoan, lòng bàn tay', en: 'Stream whetstone, melia charcoal, bare palm' },
      depthUm: 32,
      polishTarget: 0.56
    }
  ];

  const ARTIFACTS = {
    table: {
      code: 'S.01 / HỒ SƠ HIỆN VẬT',
      category: { vi: 'NỘI THẤT SƠN MÀI', en: 'LACQUER FURNITURE' },
      title: { vi: 'Bàn Trà Tĩnh Mặc', en: 'Tĩnh Mặc Low Table' },
      desc: {
        vi: 'Mặt bàn thấp nguyên khối lấy cảm hứng từ mặt hồ tĩnh lặng sau cơn mưa đêm. Mười bốn lớp sơn then Phú Thọ được mài phẳng và đánh bóng bằng lòng bàn tay, đối lập với dải khảm vỏ trứng vịt rạn và lá vàng 24K chạy dọc cạnh vát nghiêng 35 độ.',
        en: 'A low monolithic coffee table inspired by still night water after monsoon rain. Fourteen coats of nocturnal sơn then are palm-polished to a liquid mirror, contrasted against a 35-degree chamfered edge inlaid with hand-cracked duck eggshell and 24K gold leaf.'
      },
      dims: '140 × 85 × 28 cm',
      core: { vi: 'Gỗ tần bì lâu năm bọc vải màn hom đất phù sa', en: 'Kiln-dried ash timber wrapped in linen & alluvial clay' },
      strata: { vi: 'Sơn then, vỏ trứng rạn, vàng quỳ 24K, cánh gián', en: 'Sơn then black, cracked eggshell, 24K gold leaf, amber' },
      time: { vi: '14 lớp sơn · 95 ngày ủ ẩm và mài nước', en: '14 coats · 95 days of humid curing & water-sanding' },
      img: 'assets/table-960.webp',
      srcset: 'assets/table-480.webp 480w, assets/table-960.webp 960w, assets/table-1440.webp 1440w'
    },
    vessel: {
      code: 'S.02 / HỒ SƠ HIỆN VẬT',
      category: { vi: 'VẬT DỤNG ĐIÊU KHẮC', en: 'SCULPTURAL OBJECT' },
      title: { vi: 'Bình Âm Chu Sa', en: 'Chu Sa Acoustic Vessel' },
      desc: {
        vi: 'Chiếc bình dáng bất đối xứng được tạo cốt từ đất nung mỏng bọc vải màn. Người thợ phủ sơn then và thếp vàng quỳ quanh vai bình trước khi phủ kín bằng sáu lượt sơn son chu sa, rồi mài ngược trên đường cong để lộ vệt sáng vàng như địa tầng.',
        en: 'An asymmetric vessel formed over a thin terracotta-and-linen core. Gold leaf and dark umber resin are applied along the curved shoulder before being buried under six coats of cinnabar vermilion, then water-sanded to expose geological bands of gold.'
      },
      dims: 'Ø 26 × 38 cm',
      core: { vi: 'Vóc đất nung mỏng bồi vải màn và sơn sống', en: 'Thin terracotta & linen gauze composite core' },
      strata: { vi: 'Sơn son chu sa, sơn then, vàng quỳ Kiêu Kỵ', en: 'Cinnabar vermilion, sơn then umber, Kiêu Kỵ gold leaf' },
      time: { vi: '12 lớp sơn · 80 ngày chế tác thủ công', en: '12 coats · 80 days of hand crafting' },
      img: 'assets/vessel-960.webp',
      srcset: 'assets/vessel-480.webp 480w, assets/vessel-960.webp 960w, assets/vessel-1440.webp 1440w'
    },
    screen: {
      code: 'S.03 / HỒ SƠ HIỆN VẬT',
      category: { vi: 'KIẾN TRÚC NỘI THẤT', en: 'ARCHITECTURAL SCREEN' },
      title: { vi: 'Bình Phong Sương Sớm', en: 'Sương Sớm Folding Screen' },
      desc: {
        vi: 'Ba tấm vách ngăn không gian dùng sơn cánh gián trong suốt phủ trên nền gỗ và bụi bạc quỳ. Phần chân bình phong được khảm hàng ngàn mảnh vỏ trứng nướng ở các nhiệt độ khác nhau để tạo độ chuyển sắc như sương mù đang tan.',
        en: 'A three-panel architectural partition veiled in translucent burnt-amber lacquer over silver leaf dust. Toward the base, thousands of duck eggshell fragments toasted to varying temperatures create a graduated mist.'
      },
      dims: '165 × 172 × 3.2 cm',
      core: { vi: 'Khung gỗ thông Bắc Âu ghép mộng, bản lề đồng ẩn', en: 'Mortised pine frame with concealed solid brass hinges' },
      strata: { vi: 'Sơn cánh gián, vỏ trứng chuyển sắc, bạc quỳ', en: 'Burnt-amber resin, graduated toasted eggshell, silver leaf' },
      time: { vi: '16 lớp sơn · 110 ngày ủ và mài phẳng', en: '16 coats · 110 days of curing and wet honing' },
      img: 'assets/screen-960.webp',
      srcset: 'assets/screen-480.webp 480w, assets/screen-960.webp 960w, assets/screen-1440.webp 1440w'
    },
    tray: {
      code: 'S.04 / HỒ SƠ HIỆN VẬT',
      category: { vi: 'VẬT DỤNG TRÀ ĐẠO', en: 'TEA ARCHITECTURE' },
      title: { vi: 'Khay Trà Khảm Ốc', en: 'Chuyên Mỹ Inlay Tea Tray' },
      desc: {
        vi: 'Khay trà dáng vươn nhẹ khỏi mặt bàn. Bề mặt sơn then được dừng lại ở bước mài đá suối mịn để giữ độ mờ nhung tĩnh lặng, làm nổi bật những sợi chỉ ốc xà cừ Chuyên Mỹ bắt sáng xanh lục và tím theo từng góc nhìn.',
        en: 'A cantilevered rectangular tea tray raised on a recessed plinth. The black sơn then surface is arrested at the fine stream-stone stage for a quiet velvet matte finish, setting off hair-thin Chuyên Mỹ mother-of-pearl lines.'
      },
      dims: '48 × 30 × 4.5 cm',
      core: { vi: 'Gỗ gụ sấy khô bọc vải màn chống thấm nước sôi', en: 'Seasoned mahogany core sealed against boiling water' },
      strata: { vi: 'Sơn then mài đá mờ, khảm trai xanh Chuyên Mỹ', en: 'Stone-honed matte sơn then, iridescent mother-of-pearl' },
      time: { vi: '11 lớp sơn · 74 ngày hoàn thiện', en: '11 coats · 74 days of studio work' },
      img: 'assets/tray-960.webp',
      srcset: 'assets/tray-480.webp 480w, assets/tray-960.webp 960w, assets/tray-1440.webp 1440w'
    }
  };

  // STATE
  let currentLang = 'vi';
  try {
    const savedLang = localStorage.getItem('lucas-portfolio-language');
    if (savedLang === 'en' || savedLang === 'vi') currentLang = savedLang;
  } catch {}

  let activeStratum = 2;
  let lightAngle = 18;
  let currentFilter = 'all';
  let currentView = 'gallery';
  let activeDialogArtifactId = null;
  let lastTriggerEl = null;

  const plaqueConfig = {
    base: 'then',
    inlay: 'eggshell',
    finish: 'mirror',
    reveal: 55
  };

  const shortlist = [];

  // ---------------------------------------------------------------------------
  // 1. LANGUAGE SWITCHING
  // ---------------------------------------------------------------------------
  function applyLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    try {
      localStorage.setItem('lucas-portfolio-language', lang);
    } catch {}

    const dict = COPY[lang];
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) el.textContent = dict[key];
    });

    document.querySelectorAll('[data-lang-pill]').forEach((pill) => {
      pill.classList.toggle('is-active', pill.getAttribute('data-lang-pill') === lang);
    });

    const langBtn = document.getElementById('lang-switch');
    if (langBtn) {
      langBtn.setAttribute(
        'aria-label',
        lang === 'vi' ? 'Switch language to English' : 'Chuyển ngôn ngữ sang Tiếng Việt'
      );
    }

    updateStratumUI(activeStratum, false);
    updatePlaqueMetrics();
    renderShortlist();
    if (activeDialogArtifactId) populateArtifactDialog(activeDialogArtifactId);
  }

  document.getElementById('lang-switch')?.addEventListener('click', () => {
    applyLanguage(currentLang === 'vi' ? 'en' : 'vi');
  });

  // ---------------------------------------------------------------------------
  // 2. INTERACTIVE WATER-SANDING LACQUER CANVAS (#lacquer-canvas)
  // ---------------------------------------------------------------------------
  const lacquerCanvas = document.getElementById('lacquer-canvas');
  const lCtx = lacquerCanvas ? lacquerCanvas.getContext('2d') : null;
  const W = 900;
  const H = 620;

  // Wear grid (60 x 42 cells) storing sanding depth [0.0 = un-sanded topcoat, 1.0 = deep core]
  const GRID_W = 60;
  const GRID_H = 42;
  const wearGrid = new Float32Array(GRID_W * GRID_H);
  const wearLayerCanvas = document.createElement('canvas');
  wearLayerCanvas.width = GRID_W;
  wearLayerCanvas.height = GRID_H;
  const wearLayerCtx = wearLayerCanvas.getContext('2d');
  const wearImageData = wearLayerCtx ? wearLayerCtx.createImageData(GRID_W, GRID_H) : null;

  // Pre-computed procedural eggshell islands & gold dust particles for deterministic, fast rendering
  const eggshellShards = [];
  const goldParticles = [];
  const waterRipples = [];

  function initProceduralParticles() {
    let seed = 4219;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    // Generate organic cracked eggshell clusters along two diagonal veins
    for (let i = 0; i < 190; i++) {
      const t = i / 190;
      const veinX = W * (0.16 + 0.68 * t) + (rand() - 0.5) * 145;
      const veinY = H * (0.68 - 0.38 * t + Math.sin(t * Math.PI * 2.2) * 0.11) + (rand() - 0.5) * 115;
      const size = 6 + rand() * 11;
      const sides = 5 + Math.floor(rand() * 3);
      const pts = [];
      for (let s = 0; s < sides; s++) {
        const ang = (s / sides) * Math.PI * 2 + rand() * 0.35;
        const r = size * (0.68 + rand() * 0.38);
        pts.push({ x: Math.cos(ang) * r, y: Math.sin(ang) * r * 0.82 });
      }
      const toastTone = rand();
      eggshellShards.push({
        x: veinX,
        y: veinY,
        pts,
        color:
          toastTone > 0.72
            ? '#d9c7ad'
            : toastTone > 0.35
            ? '#efe7d8'
            : '#cbb494'
      });
    }

    // Generate 24K gold leaf dust constellations
    for (let i = 0; i < 340; i++) {
      const angle = rand() * Math.PI * 2;
      const dist = Math.pow(rand(), 0.7) * 360;
      goldParticles.push({
        x: W * 0.5 + Math.cos(angle) * dist * 1.15,
        y: H * 0.5 + Math.sin(angle) * dist * 0.78,
        r: 0.9 + rand() * 2.6,
        alpha: 0.45 + rand() * 0.55,
        shimmerPhase: rand() * Math.PI * 2
      });
    }
  }

  function seedWearForPreset(targetDepth) {
    for (let gy = 0; gy < GRID_H; gy++) {
      for (let gx = 0; gx < GRID_W; gx++) {
        const nx = (gx / (GRID_W - 1)) * 2 - 1;
        const ny = (gy / (GRID_H - 1)) * 2 - 1;
        const radial = Math.max(0, 1 - Math.hypot(nx * 0.92, ny * 1.05));
        const wave = 0.12 * Math.sin(gx * 0.28 + gy * 0.19);
        wearGrid[gy * GRID_W + gx] = Math.max(0.02, Math.min(0.98, targetDepth * (0.55 + 0.65 * radial) + wave));
      }
    }
  }

  function sampleWear(px, py) {
    const gx = Math.max(0, Math.min(GRID_W - 1.001, (px / W) * (GRID_W - 1)));
    const gy = Math.max(0, Math.min(GRID_H - 1.001, (py / H) * (GRID_H - 1)));
    const x0 = Math.floor(gx);
    const y0 = Math.floor(gy);
    const tx = gx - x0;
    const ty = gy - y0;
    const idx = y0 * GRID_W + x0;
    const w00 = wearGrid[idx];
    const w10 = wearGrid[idx + 1];
    const w01 = wearGrid[idx + GRID_W];
    const w11 = wearGrid[idx + GRID_W + 1];
    return (w00 * (1 - tx) + w10 * tx) * (1 - ty) + (w01 * (1 - tx) + w11 * tx) * ty;
  }

  function applySandingStroke(px, py, radius = 92, strength = 0.085) {
    for (let gy = 0; gy < GRID_H; gy++) {
      const cy = (gy / (GRID_H - 1)) * H;
      for (let gx = 0; gx < GRID_W; gx++) {
        const cx = (gx / (GRID_W - 1)) * W;
        const d = Math.hypot(cx - px, cy - py);
        if (d < radius) {
          const falloff = Math.pow(1 - d / radius, 1.6);
          const idx = gy * GRID_W + gx;
          wearGrid[idx] = Math.min(0.96, wearGrid[idx] + strength * falloff);
        }
      }
    }
    if (waterRipples.length < 14) {
      waterRipples.push({ x: px, y: py, r: 8, alpha: 0.55 });
    }
  }

  function renderLacquerStudio() {
    if (!lCtx) return;

    // 1. Deep nocturnal Sơn Then base
    const bgGrad = lCtx.createRadialGradient(
      W * (0.5 + lightAngle * 0.004),
      H * 0.45,
      30,
      W * 0.5,
      H * 0.5,
      W * 0.72
    );
    bgGrad.addColorStop(0, '#2a1813');
    bgGrad.addColorStop(0.55, '#15100e');
    bgGrad.addColorStop(1, '#0b0908');
    lCtx.fillStyle = bgGrad;
    lCtx.fillRect(0, 0, W, H);

    // 2. Smoothly interpolated multi-layered strata (vermilion seal -> nocturnal then -> alluvial timber core)
    if (wearLayerCtx && wearImageData) {
      const data = wearImageData.data;
      for (let i = 0; i < wearGrid.length; i++) {
        const w = wearGrid[i];
        const p = i * 4;
        if (w < 0.48) {
          const t = (0.48 - w) / 0.48;
          data[p] = 172;
          data[p + 1] = 42;
          data[p + 2] = 28;
          data[p + 3] = Math.round(t * t * 205);
        } else if (w > 0.72) {
          const t = Math.min(1, (w - 0.72) / 0.26);
          data[p] = 88;
          data[p + 1] = 60;
          data[p + 2] = 42;
          data[p + 3] = Math.round(t * 210);
        } else {
          data[p] = 0;
          data[p + 1] = 0;
          data[p + 2] = 0;
          data[p + 3] = 0;
        }
      }
      wearLayerCtx.putImageData(wearImageData, 0, 0);
      lCtx.save();
      lCtx.imageSmoothingEnabled = true;
      lCtx.imageSmoothingQuality = 'high';
      lCtx.drawImage(wearLayerCanvas, 0, 0, W, H);
      lCtx.restore();
    }

    // 3. Buried 24K Gold Leaf Dust (visible where wear is between 0.22 and 0.78)
    for (let i = 0; i < goldParticles.length; i++) {
      const p = goldParticles[i];
      const w = sampleWear(p.x, p.y);
      const visibility =
        w > 0.18 && w < 0.82
          ? Math.sin(((w - 0.18) / 0.64) * Math.PI)
          : 0;
      if (visibility > 0.05) {
        const glint = 0.75 + 0.25 * Math.sin(p.shimmerPhase + lightAngle * 0.08);
        lCtx.fillStyle = `rgba(222, 178, 92, ${(visibility * p.alpha * glint).toFixed(3)})`;
        lCtx.beginPath();
        lCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        lCtx.fill();
      }
    }

    // 4. Hand-cracked Duck Eggshell Mosaic Shards (visible where wear is 0.28 to 0.76)
    for (let i = 0; i < eggshellShards.length; i++) {
      const s = eggshellShards[i];
      const w = sampleWear(s.x, s.y);
      if (w > 0.24 && w < 0.78) {
        const reveal = Math.min(1, (w - 0.24) / 0.22) * Math.min(1, (0.78 - w) / 0.16);
        lCtx.save();
        lCtx.translate(s.x, s.y);
        lCtx.globalAlpha = reveal * 0.92;
        lCtx.fillStyle = s.color;
        lCtx.strokeStyle = '#18120f';
        lCtx.lineWidth = 0.85;
        lCtx.beginPath();
        s.pts.forEach((pt, idx) => {
          if (idx === 0) lCtx.moveTo(pt.x, pt.y);
          else lCtx.lineTo(pt.x, pt.y);
        });
        lCtx.closePath();
        lCtx.fill();
        lCtx.stroke();
        lCtx.restore();
      }
    }

    // 5. Fine linen weave texture on deep core areas
    lCtx.strokeStyle = 'rgba(214, 190, 158, 0.045)';
    lCtx.lineWidth = 1;
    for (let y = 16; y < H; y += 14) {
      const wMid = sampleWear(W * 0.5, y);
      if (wMid > 0.74) {
        lCtx.beginPath();
        lCtx.moveTo(24, y);
        lCtx.lineTo(W - 24, y);
        lCtx.stroke();
      }
    }

    // 6. Specular Cánh Gián grazing reflection band controlled by #light-angle
    const sheenX = W * (0.5 + (lightAngle / 60) * 0.36);
    const sheenGrad = lCtx.createLinearGradient(sheenX - 240, 0, sheenX + 240, H);
    sheenGrad.addColorStop(0, 'rgba(255, 240, 215, 0)');
    sheenGrad.addColorStop(0.46, 'rgba(225, 175, 102, 0.09)');
    sheenGrad.addColorStop(0.5, 'rgba(255, 246, 232, 0.16)');
    sheenGrad.addColorStop(0.54, 'rgba(201, 130, 62, 0.08)');
    sheenGrad.addColorStop(1, 'rgba(255, 240, 215, 0)');
    lCtx.fillStyle = sheenGrad;
    lCtx.fillRect(0, 0, W, H);

    // 7. Active water-sanding rings
    for (let i = waterRipples.length - 1; i >= 0; i--) {
      const rp = waterRipples[i];
      lCtx.strokeStyle = `rgba(242, 236, 225, ${rp.alpha.toFixed(3)})`;
      lCtx.lineWidth = 1.2;
      lCtx.beginPath();
      lCtx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
      lCtx.stroke();
      rp.r += 2.6;
      rp.alpha *= 0.88;
      if (rp.alpha < 0.03) waterRipples.splice(i, 1);
    }

    // 8. Inner chamfer border
    lCtx.strokeStyle = 'rgba(209, 163, 83, 0.28)';
    lCtx.lineWidth = 1;
    lCtx.strokeRect(18.5, 18.5, W - 37, H - 37);

    updateCanvasHUD();

    if (waterRipples.length > 0) {
      requestAnimationFrame(renderLacquerStudio);
    }
  }

  function updateCanvasHUD() {
    let sum = 0;
    for (let i = 0; i < wearGrid.length; i++) sum += wearGrid[i];
    const avg = sum / wearGrid.length;
    const pct = Math.round(avg * 100);
    const um = Math.round(avg * 145);

    const hudDepth = document.getElementById('hud-depth');
    const hudPct = document.getElementById('hud-polish-pct');
    const hudExposed = document.getElementById('hud-exposed');

    if (hudDepth) {
      hudDepth.textContent =
        currentLang === 'vi' ? `ĐỘ SÂU MÀI · ${um} µm` : `HONING DEPTH · ${um} µm`;
    }
    if (hudPct) {
      hudPct.textContent =
        currentLang === 'vi' ? `ĐỘ MÀI · ${pct}%` : `POLISH · ${pct}%`;
    }
    if (hudExposed) {
      let layerName = '';
      if (avg < 0.22) {
        layerName = currentLang === 'vi' ? 'SƠN SON CHU SA' : 'CINNABAR VERMILION';
      } else if (avg < 0.58) {
        layerName = currentLang === 'vi' ? 'VỎ TRỨNG & VÀNG QUỲ' : 'EGGSHELL & 24K GOLD';
      } else if (avg < 0.78) {
        layerName = currentLang === 'vi' ? 'SƠN THEN ĐEN THẲM' : 'NOCTURNAL SƠN THEN';
      } else {
        layerName = currentLang === 'vi' ? 'VÓC GỖ & ĐẤT PHÙ SA' : 'TIMBER & CLAY CORE';
      }
      hudExposed.textContent =
        currentLang === 'vi' ? `LỘ SÁNG · ${layerName}` : `EXPOSED · ${layerName}`;
    }
  }

  function updateStratumUI(index, reseedCanvas = true) {
    activeStratum = index;
    const data = STRATA_DATA[index];
    const heroSection = document.getElementById('ban-mai');
    if (heroSection) heroSection.dataset.activeStratum = String(index);

    const tabs = document.querySelectorAll('.stratum-tab');
    tabs.forEach((tab, idx) => {
      const selected = idx === index;
      tab.classList.toggle('is-active', selected);
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });

    const panel = document.getElementById('stratum-panel');
    if (panel) panel.setAttribute('aria-labelledby', `stratum-tab-${index}`);

    const counter = document.getElementById('strata-step-counter');
    if (counter) counter.textContent = `0${index + 1} / 05`;

    const setEl = (id, text) => {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    };

    setEl('dossier-code', data.code[currentLang]);
    setEl('dossier-badge', data.badge[currentLang]);
    setEl('dossier-title', data.title[currentLang]);
    setEl('dossier-description', data.desc[currentLang]);
    setEl('dossier-material', data.material[currentLang]);
    setEl('dossier-humidity', data.humidity[currentLang]);
    setEl('dossier-tool', data.tool[currentLang]);

    const depthBars = document.querySelectorAll('#depth-bars i');
    depthBars.forEach((bar, bIdx) => {
      bar.classList.toggle('is-active', 4 - bIdx === index);
    });

    if (reseedCanvas) {
      seedWearForPreset(data.polishTarget);
      renderLacquerStudio();
    }
  }

  // Bind Stratum Tabs (click + arrow keys)
  const stratumTabs = Array.from(document.querySelectorAll('.stratum-tab'));
  stratumTabs.forEach((tab, idx) => {
    tab.addEventListener('click', () => updateStratumUI(idx, true));
    tab.addEventListener('keydown', (e) => {
      let next = null;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (idx + 1) % stratumTabs.length;
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (idx - 1 + stratumTabs.length) % stratumTabs.length;
      if (e.key === 'Home') next = 0;
      if (e.key === 'End') next = stratumTabs.length - 1;
      if (next !== null) {
        e.preventDefault();
        stratumTabs[next].focus();
        updateStratumUI(next, true);
      }
    });
  });

  // Pointer sanding interaction on #lacquer-canvas
  let isSanding = false;
  function getCanvasCoords(e, canvas) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * canvas.width,
      y: ((e.clientY - rect.top) / rect.height) * canvas.height
    };
  }

  if (lacquerCanvas) {
    lacquerCanvas.addEventListener('pointerdown', (e) => {
      isSanding = true;
      lacquerCanvas.setPointerCapture?.(e.pointerId);
      const pt = getCanvasCoords(e, lacquerCanvas);
      applySandingStroke(pt.x, pt.y, 96, 0.09);
      renderLacquerStudio();
    });

    lacquerCanvas.addEventListener('pointermove', (e) => {
      if (!isSanding) return;
      const pt = getCanvasCoords(e, lacquerCanvas);
      applySandingStroke(pt.x, pt.y, 88, 0.065);
      renderLacquerStudio();
    });

    const stopSanding = () => {
      isSanding = false;
    };
    lacquerCanvas.addEventListener('pointerup', stopSanding);
    lacquerCanvas.addEventListener('pointercancel', stopSanding);
  }

  document.getElementById('auto-polish-btn')?.addEventListener('click', () => {
    seedWearForPreset(0.46);
    waterRipples.push({ x: W * 0.48, y: H * 0.5, r: 16, alpha: 0.65 });
    renderLacquerStudio();
  });

  document.getElementById('reset-coat-btn')?.addEventListener('click', () => {
    seedWearForPreset(0.08);
    renderLacquerStudio();
  });

  document.getElementById('light-angle')?.addEventListener('input', (e) => {
    lightAngle = Number(e.target.value);
    renderLacquerStudio();
  });

  // ---------------------------------------------------------------------------
  // 3. ARCHIVE FILTERING, VIEW MODE & ARTIFACT DOSSIER MODAL
  // ---------------------------------------------------------------------------
  const artifactGrid = document.getElementById('artifact-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const viewBtns = document.querySelectorAll('.view-btn');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      currentFilter = btn.dataset.filter || 'all';
      filterBtns.forEach((b) => {
        const active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', String(active));
      });

      let visibleCount = 0;
      document.querySelectorAll('.artifact-card').forEach((card) => {
        const match = currentFilter === 'all' || card.dataset.category === currentFilter;
        card.hidden = !match;
        if (match) visibleCount++;
      });

      artifactGrid?.classList.toggle('is-filtered', currentFilter !== 'all');
      const status = document.getElementById('archive-status');
      if (status) {
        status.textContent =
          currentLang === 'vi'
            ? `Đang hiển thị ${visibleCount} hiện vật.`
            : `Showing ${visibleCount} works.`;
      }
    });
  });

  viewBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      currentView = btn.dataset.view || 'gallery';
      viewBtns.forEach((b) => {
        const active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', String(active));
      });
      artifactGrid?.classList.toggle('is-list', currentView === 'list');
    });
  });

  // Artifact Dossier Modal
  const artifactDialog = document.getElementById('artifact-dialog');

  function populateArtifactDialog(id) {
    const item = ARTIFACTS[id];
    if (!item) return;
    activeDialogArtifactId = id;

    document.getElementById('dialog-artifact-code').textContent = item.code;
    document.getElementById('dialog-artifact-category').textContent = item.category[currentLang];
    document.getElementById('dialog-artifact-title').textContent = item.title[currentLang];
    document.getElementById('dialog-artifact-desc').textContent = item.desc[currentLang];
    document.getElementById('dialog-artifact-dims').textContent = item.dims;
    document.getElementById('dialog-artifact-core').textContent = item.core[currentLang];
    document.getElementById('dialog-artifact-strata').textContent = item.strata[currentLang];
    document.getElementById('dialog-artifact-time').textContent = item.time[currentLang];

    const img = document.getElementById('dialog-artifact-img');
    if (img) {
      img.src = item.img;
      img.srcset = item.srcset;
      img.alt = item.title[currentLang];
    }

    const saveBtn = document.getElementById('dialog-save-artifact');
    const saveLabel = document.getElementById('dialog-save-label');
    const alreadySaved = shortlist.some((entry) => entry.id === `artifact-${id}`);
    if (saveBtn && saveLabel) {
      saveBtn.setAttribute('aria-pressed', String(alreadySaved));
      saveLabel.textContent = alreadySaved
        ? currentLang === 'vi'
          ? 'Đã lưu trong sổ mẫu'
          : 'Saved in Shortlist'
        : currentLang === 'vi'
        ? 'Lưu hiện vật vào sổ mẫu'
        : 'Save Work to Shortlist';
    }
    const statusEl = document.getElementById('dialog-artifact-status');
    if (statusEl) statusEl.textContent = '';
  }

  document.querySelectorAll('[data-open-artifact]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-open-artifact');
      lastTriggerEl = btn;
      populateArtifactDialog(id);
      if (artifactDialog && typeof artifactDialog.showModal === 'function') {
        artifactDialog.showModal();
      }
    });
  });

  document.getElementById('close-artifact-dialog')?.addEventListener('click', () => {
    artifactDialog?.close();
  });

  artifactDialog?.addEventListener('close', () => {
    activeDialogArtifactId = null;
    lastTriggerEl?.focus();
  });

  artifactDialog?.addEventListener('click', (e) => {
    if (e.target === artifactDialog) artifactDialog.close();
  });

  document.getElementById('dialog-save-artifact')?.addEventListener('click', () => {
    if (!activeDialogArtifactId) return;
    const item = ARTIFACTS[activeDialogArtifactId];
    const entryId = `artifact-${activeDialogArtifactId}`;
    const existingIdx = shortlist.findIndex((x) => x.id === entryId);
    const statusEl = document.getElementById('dialog-artifact-status');

    if (existingIdx === -1) {
      shortlist.push({
        id: entryId,
        title: item.title,
        spec: `${item.code.split(' ')[0]} · ${item.dims}`
      });
      if (statusEl) {
        statusEl.textContent =
          currentLang === 'vi'
            ? 'Đã thêm hiện vật vào sổ mẫu của bạn.'
            : 'Added work to your atelier shortlist.';
      }
    } else {
      shortlist.splice(existingIdx, 1);
      if (statusEl) {
        statusEl.textContent =
          currentLang === 'vi' ? 'Đã gỡ khỏi sổ mẫu.' : 'Removed from shortlist.';
      }
    }
    populateArtifactDialog(activeDialogArtifactId);
    renderShortlist();
  });

  // ---------------------------------------------------------------------------
  // 4. CUSTOM SAMPLE PLAQUE COMPOSER (#plaque-canvas)
  // ---------------------------------------------------------------------------
  const plaqueCanvas = document.getElementById('plaque-canvas');
  const pCtx = plaqueCanvas ? plaqueCanvas.getContext('2d') : null;

  const BASE_PALETTES = {
    then: { c0: '#241d19', c1: '#120e0c', c2: '#090706', code: 'THEN', layers: 14, days: 92 },
    son: { c0: '#b83224', c1: '#701810', c2: '#2b0906', code: 'SON', layers: 13, days: 86 },
    'canh-gian': { c0: '#8f471e', c1: '#4d220c', c2: '#1f0d05', code: 'AMBER', layers: 15, days: 98 },
    reu: { c0: '#2e4233', c1: '#18241b', c2: '#0c120d', code: 'MOSS', layers: 14, days: 90 }
  };

  function renderPlaquePreview(targetCtx = pCtx, width = 760, height = 520) {
    if (!targetCtx) return;
    const pal = BASE_PALETTES[plaqueConfig.base] || BASE_PALETTES.then;
    const reveal = plaqueConfig.reveal / 100;

    const grad = targetCtx.createRadialGradient(
      width * 0.42,
      height * 0.38,
      20,
      width * 0.5,
      height * 0.5,
      width * 0.7
    );
    grad.addColorStop(0, pal.c0);
    grad.addColorStop(0.58, pal.c1);
    grad.addColorStop(1, pal.c2);
    targetCtx.fillStyle = grad;
    targetCtx.fillRect(0, 0, width, height);

    // Subtle organic wood/sanding grain lines
    targetCtx.strokeStyle = 'rgba(255, 238, 210, 0.035)';
    targetCtx.lineWidth = 1;
    for (let i = 0; i < 28; i++) {
      const y = (i / 28) * height;
      targetCtx.beginPath();
      targetCtx.moveTo(0, y);
      targetCtx.bezierCurveTo(
        width * 0.33,
        y + Math.sin(i * 0.7) * 14,
        width * 0.66,
        y - Math.cos(i * 0.6) * 14,
        width,
        y
      );
      targetCtx.stroke();
    }

    // Render chosen inlay according to reveal %
    let seed = 901;
    const rand = () => {
      seed = (seed * 48271) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    if (plaqueConfig.inlay === 'eggshell') {
      const count = Math.floor(40 + reveal * 170);
      for (let i = 0; i < count; i++) {
        const cx = width * (0.14 + rand() * 0.72);
        const cy = height * (0.18 + rand() * 0.64);
        const r = 5 + rand() * 11;
        targetCtx.fillStyle = rand() > 0.35 ? '#eee5d5' : '#cfb898';
        targetCtx.strokeStyle = pal.c2;
        targetCtx.lineWidth = 0.9;
        targetCtx.beginPath();
        for (let s = 0; s < 5; s++) {
          const a = (s / 5) * Math.PI * 2 + rand() * 0.3;
          const px = cx + Math.cos(a) * r;
          const py = cy + Math.sin(a) * r * 0.8;
          if (s === 0) targetCtx.moveTo(px, py);
          else targetCtx.lineTo(px, py);
        }
        targetCtx.closePath();
        targetCtx.fill();
        targetCtx.stroke();
      }
    } else if (plaqueConfig.inlay === 'gold') {
      const count = Math.floor(80 + reveal * 320);
      for (let i = 0; i < count; i++) {
        const cx = width * (0.1 + rand() * 0.8);
        const cy = height * (0.12 + rand() * 0.76);
        const r = 1 + rand() * 3.4;
        targetCtx.fillStyle = `rgba(224, 179, 88, ${(0.35 + rand() * 0.6).toFixed(2)})`;
        targetCtx.beginPath();
        targetCtx.arc(cx, cy, r, 0, Math.PI * 2);
        targetCtx.fill();
      }
    } else if (plaqueConfig.inlay === 'pearl') {
      const lines = Math.floor(6 + reveal * 16);
      for (let i = 0; i < lines; i++) {
        const y = height * (0.22 + (i / lines) * 0.56);
        const x1 = width * (0.15 + rand() * 0.15);
        const x2 = width * (0.85 - rand() * 0.15);
        const pGrad = targetCtx.createLinearGradient(x1, y, x2, y);
        pGrad.addColorStop(0, 'rgba(132, 214, 194, 0.78)');
        pGrad.addColorStop(0.5, 'rgba(218, 192, 236, 0.88)');
        pGrad.addColorStop(1, 'rgba(148, 220, 185, 0.75)');
        targetCtx.strokeStyle = pGrad;
        targetCtx.lineWidth = 1.8;
        targetCtx.beginPath();
        targetCtx.moveTo(x1, y);
        targetCtx.lineTo(x2, y);
        targetCtx.stroke();
      }
    }

    // Finish sheen (Mirror vs Matte)
    if (plaqueConfig.finish === 'mirror') {
      const mirrorGrad = targetCtx.createLinearGradient(0, 0, width, height);
      mirrorGrad.addColorStop(0, 'rgba(255, 255, 255, 0.14)');
      mirrorGrad.addColorStop(0.38, 'rgba(255, 255, 255, 0.02)');
      mirrorGrad.addColorStop(0.5, 'rgba(255, 248, 232, 0.16)');
      mirrorGrad.addColorStop(0.62, 'rgba(255, 255, 255, 0.01)');
      mirrorGrad.addColorStop(1, 'rgba(0, 0, 0, 0.25)');
      targetCtx.fillStyle = mirrorGrad;
      targetCtx.fillRect(0, 0, width, height);
    } else {
      targetCtx.fillStyle = 'rgba(24, 20, 18, 0.18)';
      targetCtx.fillRect(0, 0, width, height);
    }

    // Chamfer frame border
    targetCtx.strokeStyle = 'rgba(209, 163, 83, 0.38)';
    targetCtx.lineWidth = 1.2;
    targetCtx.strokeRect(16, 16, width - 32, height - 32);
  }

  function updatePlaqueMetrics() {
    const pal = BASE_PALETTES[plaqueConfig.base] || BASE_PALETTES.then;
    const inlayBonus = plaqueConfig.inlay === 'pure' ? 0 : 2;
    const layers = pal.layers + inlayBonus;
    const days = pal.days + inlayBonus * 4;
    const inlayCode = plaqueConfig.inlay.toUpperCase().slice(0, 4);
    const finishCode = plaqueConfig.finish === 'mirror' ? 'MR' : 'MT';

    const serialEl = document.getElementById('plaque-serial');
    if (serialEl) {
      serialEl.textContent = `SON · SPEC #S26-${pal.code}-${inlayCode}-${finishCode}${plaqueConfig.reveal}`;
    }

    const layersEl = document.getElementById('metric-layers');
    const daysEl = document.getElementById('metric-days');
    const sheenEl = document.getElementById('metric-sheen');

    if (layersEl) {
      layersEl.textContent = currentLang === 'vi' ? `${layers} lớp` : `${layers} coats`;
    }
    if (daysEl) {
      daysEl.textContent = currentLang === 'vi' ? `${days} ngày` : `${days} days`;
    }
    if (sheenEl) {
      sheenEl.textContent =
        plaqueConfig.finish === 'mirror'
          ? currentLang === 'vi'
            ? 'Bóng sâu (88 GU)'
            : 'Liquid Mirror (88 GU)'
          : currentLang === 'vi'
          ? 'Mờ đá suối (18 GU)'
          : 'Stone Matte (18 GU)';
    }

    renderPlaquePreview();
  }

  // Bind Composer Option Buttons
  function bindOptionGroup(selector, attr, key) {
    const buttons = document.querySelectorAll(selector);
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        plaqueConfig[key] = btn.getAttribute(attr);
        buttons.forEach((b) => {
          const active = b === btn;
          b.classList.toggle('is-selected', active);
          b.setAttribute('aria-pressed', String(active));
        });
        updatePlaqueMetrics();
      });
    });
  }

  bindOptionGroup('[data-base]', 'data-base', 'base');
  bindOptionGroup('[data-inlay]', 'data-inlay', 'inlay');
  bindOptionGroup('[data-finish]', 'data-finish', 'finish');

  const revealSlider = document.getElementById('reveal-slider');
  const revealOutput = document.getElementById('reveal-output');
  revealSlider?.addEventListener('input', (e) => {
    plaqueConfig.reveal = Number(e.target.value);
    if (revealOutput) revealOutput.textContent = `${plaqueConfig.reveal}%`;
    updatePlaqueMetrics();
  });

  // Save Custom Plaque to Shortlist
  document.getElementById('save-plaque-btn')?.addEventListener('click', () => {
    const serial = document.getElementById('plaque-serial')?.textContent || 'SON-SPEC';
    const id = `plaque-${plaqueConfig.base}-${plaqueConfig.inlay}-${plaqueConfig.finish}-${plaqueConfig.reveal}`;
    const feedback = document.getElementById('composer-feedback');

    if (!shortlist.some((x) => x.id === id)) {
      shortlist.push({
        id,
        title: {
          vi: `Tấm mẫu sơn ta (${plaqueConfig.base.toUpperCase()} / ${plaqueConfig.inlay})`,
          en: `Custom Lacquer Plaque (${plaqueConfig.base.toUpperCase()} / ${plaqueConfig.inlay})`
        },
        spec: serial
      });
      renderShortlist();
    }

    if (feedback) {
      feedback.textContent =
        currentLang === 'vi'
          ? 'Đã lưu tấm mẫu vào sổ mẫu của bạn.'
          : 'Saved custom plaque to your shortlist.';
    }
  });

  // Export 1200 x 1500 Architectural Spec Sheet PNG
  document.getElementById('export-plaque-btn')?.addEventListener('click', () => {
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = 1200;
    exportCanvas.height = 1500;
    const ctx = exportCanvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#120f0d';
    ctx.fillRect(0, 0, 1200, 1500);

    ctx.strokeStyle = '#382e28';
    ctx.lineWidth = 2;
    ctx.strokeRect(48, 48, 1104, 1404);

    // Header
    ctx.fillStyle = '#d1a353';
    ctx.font = '20px "Courier New", monospace';
    ctx.fillText('SON ATELIER · HANOI · MATERIAL SPECIFICATION SHEET', 96, 118);

    // Render Plaque in middle frame
    const subCanvas = document.createElement('canvas');
    subCanvas.width = 1008;
    subCanvas.height = 760;
    renderPlaquePreview(subCanvas.getContext('2d'), 1008, 760);
    ctx.drawImage(subCanvas, 96, 160);

    // Spec typography
    ctx.fillStyle = '#f2ece1';
    ctx.font = '56px Georgia, serif';
    ctx.fillText('SON — Bảng Mẫu Sơn Ta', 96, 1020);

    const serial = document.getElementById('plaque-serial')?.textContent || '';
    ctx.fillStyle = '#d1a353';
    ctx.font = '24px "Courier New", monospace';
    ctx.fillText(serial, 96, 1072);

    ctx.fillStyle = '#b6aa9b';
    ctx.font = '24px sans-serif';
    ctx.fillText(
      `Base: ${plaqueConfig.base.toUpperCase()}  |  Inlay: ${plaqueConfig.inlay.toUpperCase()}  |  Honing: ${plaqueConfig.finish.toUpperCase()} (${plaqueConfig.reveal}% reveal)`,
      96,
      1140
    );
    ctx.fillText('Dimensions: 180 × 120 × 14 mm · Cured at 85% RH in Hạ Thái & Hanoi', 96, 1188);

    ctx.strokeStyle = '#382e28';
    ctx.beginPath();
    ctx.moveTo(96, 1260);
    ctx.lineTo(1104, 1260);
    ctx.stroke();

    ctx.fillStyle = '#85786b';
    ctx.font = '20px "Courier New", monospace';
    ctx.fillText('INDEPENDENT DESIGN SHOWCASE BY LUCAS NGUYEN · /HIDDEN/SON/', 96, 1320);

    const link = document.createElement('a');
    link.download = `son-plaque-${plaqueConfig.base}-${plaqueConfig.inlay}.png`;
    link.href = exportCanvas.toDataURL('image/png');
    link.click();

    const feedback = document.getElementById('composer-feedback');
    if (feedback) {
      feedback.textContent =
        currentLang === 'vi'
          ? 'Đã tải xuống phiếu mẫu PNG (1200 × 1500).'
          : 'Downloaded PNG specification sheet (1200 × 1500).';
    }
  });

  // ---------------------------------------------------------------------------
  // 5. SHORTLIST DIALOG & CLIPBOARD COPY
  // ---------------------------------------------------------------------------
  const shortlistDialog = document.getElementById('shortlist-dialog');

  function renderShortlist() {
    const countEl = document.getElementById('shortlist-count');
    if (countEl) countEl.textContent = String(shortlist.length);

    const container = document.getElementById('shortlist-items');
    const inquiryWrap = document.getElementById('shortlist-inquiry-wrap');
    const noteArea = document.getElementById('shortlist-note');
    if (!container) return;

    container.replaceChildren();

    if (shortlist.length === 0) {
      const empty = document.createElement('p');
      empty.className = 'shortlist-empty';
      empty.textContent =
        currentLang === 'vi'
          ? 'Chưa có hiện vật hoặc tấm mẫu nào được lưu. Bạn có thể lưu từ mục Hiện vật hoặc Bảng mẫu.'
          : 'Your shortlist is currently empty. Save a completed work or compose a custom sample plaque below.';
      container.appendChild(empty);
      if (inquiryWrap) inquiryWrap.hidden = true;
      return;
    }

    shortlist.forEach((item, idx) => {
      const row = document.createElement('div');
      row.className = 'shortlist-row';

      const info = document.createElement('div');
      const title = document.createElement('strong');
      title.textContent = typeof item.title === 'object' ? item.title[currentLang] : item.title;
      const spec = document.createElement('span');
      spec.textContent = item.spec;
      info.append(title, spec);

      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.className = 'remove-shortlist-item';
      removeBtn.textContent = currentLang === 'vi' ? 'Gỡ bỏ' : 'Remove';
      removeBtn.addEventListener('click', () => {
        shortlist.splice(idx, 1);
        renderShortlist();
      });

      row.append(info, removeBtn);
      container.appendChild(row);
    });

    if (inquiryWrap) inquiryWrap.hidden = false;
    if (noteArea) {
      const lines = shortlist.map((item, i) => {
        const name = typeof item.title === 'object' ? item.title[currentLang] : item.title;
        return `${i + 1}. ${name} (${item.spec})`;
      });
      noteArea.value =
        currentLang === 'vi'
          ? `Xin chào xưởng SON,\nTôi muốn trao đổi thêm về các mẫu sơn mài sau:\n${lines.join('\n')}\n\nMong nhận được thông tin về thời gian chế tác và tấm mẫu thử.`
          : `Hello SON Atelier,\nI would like to inquire about the following lacquer works and sample plaques:\n${lines.join('\n')}\n\nPlease share curing lead times and sample availability.`;
    }
  }

  document.getElementById('open-shortlist')?.addEventListener('click', (e) => {
    lastTriggerEl = e.currentTarget;
    renderShortlist();
    if (shortlistDialog && typeof shortlistDialog.showModal === 'function') {
      shortlistDialog.showModal();
    }
  });

  document.getElementById('close-shortlist-dialog')?.addEventListener('click', () => {
    shortlistDialog?.close();
  });

  shortlistDialog?.addEventListener('close', () => {
    lastTriggerEl?.focus();
  });

  shortlistDialog?.addEventListener('click', (e) => {
    if (e.target === shortlistDialog) shortlistDialog.close();
  });

  document.getElementById('clear-shortlist-btn')?.addEventListener('click', () => {
    shortlist.length = 0;
    renderShortlist();
  });

  document.getElementById('copy-shortlist-btn')?.addEventListener('click', async () => {
    const noteArea = document.getElementById('shortlist-note');
    const status = document.getElementById('copy-shortlist-status');
    if (!noteArea || !status) return;
    try {
      await navigator.clipboard.writeText(noteArea.value);
      status.textContent =
        currentLang === 'vi'
          ? 'Đã sao chép nội dung vào bộ nhớ tạm.'
          : 'Copied specification note to clipboard.';
    } catch {
      noteArea.select();
      status.textContent =
        currentLang === 'vi'
          ? 'Đã bôi đen văn bản. Hãy nhấn Cmd/Ctrl + C để sao chép.'
          : 'Selected text. Press Cmd/Ctrl + C to copy.';
    }
  });

  // ---------------------------------------------------------------------------
  // INITIALIZE
  // ---------------------------------------------------------------------------
  initProceduralParticles();
  applyLanguage(currentLang);
  seedWearForPreset(STRATA_DATA[activeStratum].polishTarget);
  renderLacquerStudio();
  updatePlaqueMetrics();
})();
