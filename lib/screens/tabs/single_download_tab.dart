import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../services/api_service.dart';
import '../widgets/glass_card.dart';

class SingleDownloadTab extends StatefulWidget {
  const SingleDownloadTab({super.key});

  @override
  State<SingleDownloadTab> createState() => _SingleDownloadTabState();
}

class _SingleDownloadTabState extends State<SingleDownloadTab> {
  final TextEditingController _urlController = TextEditingController();
  bool _isLoading = false;

  void _handleDownload() async {
    final url = _urlController.text.trim();
    if (url.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Please paste a link first")),
      );
      return;
    }

    setState(() => _isLoading = true);
    
    try {
      final apiService = Provider.of<ApiService>(context, listen: false);
      final result = await apiService.getVideoInfo(url);
      
      // Navigate to results or show card
      // For this demo, we'll just show a success message
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("Found video: ${result['title'] ?? 'TikTok Video'}")),
      );
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("Error: ${e.toString()}")),
      );
    } finally {
      setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(24.0),
      child: Column(
        children: [
          GlassCard(
            child: Column(
              children: [
                TextField(
                  controller: _urlController,
                  decoration: InputDecoration(
                    hintText: "Paste TikTok, YouTube, or IG link here...",
                    hintStyle: TextStyle(color: Colors.white.withOpacity(0.3)),
                    prefixIcon: const Icon(Icons.link, color: Color(0xFFFFD700)),
                    filled: true,
                    fillColor: Colors.black.withOpacity(0.2),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(15),
                      borderSide: BorderSide.none,
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(15),
                      borderSide: const BorderSide(color: Color(0xFFFFD700), width: 1),
                    ),
                  ),
                ),
                const SizedBox(height: 20),
                SizedBox(
                  width: double.infinity,
                  height: 55,
                  child: ElevatedButton(
                    onPressed: _isLoading ? null : _handleDownload,
                    child: _isLoading 
                      ? const SizedBox(
                          height: 20, 
                          width: 20, 
                          child: CircularProgressIndicator(strokeWidth: 2, color: Colors.black)
                        )
                      : Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: const [
                            Text("DOWNLOAD", style: TextStyle(letterSpacing: 1.2)),
                            SizedBox(width: 10),
                            Icon(Icons.download_rounded, size: 20),
                          ],
                        ),
                  ),
                ),
              ],
            ),
          ),
          
          if (_isLoading)
            Padding(
              padding: const EdgeInsets.only(top: 40),
              child: Column(
                children: const [
                  CircularProgressIndicator(color: Color(0xFFFFD700)),
                  SizedBox(height: 16),
                  Text("Fetching video magic...", style: TextStyle(color: Colors.grey)),
                ],
              ),
            ),
        ],
      ),
    );
  }
}
