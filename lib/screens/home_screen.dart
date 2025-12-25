import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'tabs/single_download_tab.dart';
import 'tabs/bulk_download_tab.dart';
import 'tabs/history_tab.dart';
import '../widgets/glass_app_bar.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBodyBehindAppBar: true,
      appBar: const GlassAppBar(),
      body: Container(
        decoration: const BoxDecoration(
          color: Color(0xFF0F0F0F),
        ),
        child: Column(
          children: [
            const SizedBox(height: 120), // Height for GlassAppBar
            
            // Hero Title
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Column(
                children: [
                  const Text(
                    "Download Content",
                    style: TextStyle(fontSize: 32, fontWeight: FontWeight.bold),
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        "Without ",
                        style: TextStyle(fontSize: 32, fontWeight: FontWeight.bold, color: Colors.white.withOpacity(0.8)),
                      ),
                      const Text(
                        "Watermark",
                        style: TextStyle(fontSize: 32, fontWeight: FontWeight.bold, color: Color(0xFFFFD700)),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  const Text(
                    "Fast, simple, and high quality. Supports bulk downloads.",
                    textAlign: TextAlign.center,
                    style: TextStyle(color: Colors.grey, fontSize: 16),
                  ),
                ],
              ),
            ),
            
            const SizedBox(height: 30),
            
            // Tabs
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24),
              child: Container(
                height: 50,
                padding: const EdgeInsets.all(4),
                decoration: BoxDecoration(
                  color: const Color(0xFF1A1A1A),
                  borderRadius: BorderRadius.circular(15),
                ),
                child: TabBar(
                  controller: _tabController,
                  indicator: BoxDecoration(
                    color: const Color(0xFFFFD700),
                    borderRadius: BorderRadius.circular(12),
                    boxShadow: [
                      BoxShadow(
                        color: const Color(0xFFFFD700).withOpacity(0.2),
                        blurRadius: 10,
                        offset: const Offset(0, 4),
                      ),
                    ],
                  ),
                  labelColor: Colors.black,
                  unselectedLabelColor: Colors.grey,
                  labelStyle: const TextStyle(fontWeight: FontWeight.bold),
                  tabs: const [
                    Tab(text: "Single"),
                    Tab(text: "Bulk"),
                    Tab(text: "History"),
                  ],
                ),
              ),
            ),
            
            const SizedBox(height: 20),
            
            // Tab Content
            Expanded(
              child: TabBarView(
                controller: _tabController,
                children: const [
                  SingleDownloadTab(),
                  BulkDownloadTab(),
                  HistoryTab(),
                ],
              ),
            ),
            
            // Platform Icons Footer
            _buildPlatformFooter(),
          ],
        ),
      ),
    );
  }

  Widget _buildPlatformFooter() {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 24),
      decoration: BoxDecoration(
        color: Colors.black.withOpacity(0.5),
        border: Border(top: BorderSide(color: Colors.white.withOpacity(0.05))),
      ),
      child: Column(
        children: [
          const Text(
            "SUPPORTED PLATFORMS",
            style: TextStyle(color: Colors.grey, fontSize: 10, letterSpacing: 2, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 16),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              _platformIcon(FontAwesomeIcons.tiktok, Colors.white),
              _platformIcon(FontAwesomeIcons.youtube, Colors.red),
              _platformIcon(FontAwesomeIcons.instagram, Colors.pink),
              _platformIcon(FontAwesomeIcons.facebook, Colors.blue),
              _platformIcon(FontAwesomeIcons.xTwitter, Colors.white),
            ],
          ),
        ],
      ),
    );
  }

  Widget _platformIcon(IconData icon, Color color) {
    return Container(
      padding: const EdgeInsets.all(10),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        shape: BoxShape.circle,
        border: Border.all(color: color.withOpacity(0.2)),
      ),
      child: Icon(icon, color: color, size: 20),
    );
  }
}
